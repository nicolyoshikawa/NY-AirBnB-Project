const validator = require('validator');
const chai = require('chai');
let chaiHttp = require('chai-http');
const { AssertionError } = require('chai');
chai.use(chaiHttp);
const expect = chai.expect;
const fetch = require('node-fetch');
const baseUrl = process.env.BASE_URL;

function findBodyErrors(modelBody, body, props) {
  const errors = [];

  function compareBodies(modelBody, body, props, keys = "body") {
    // if body can optionally be null and is set to null, then skip validation
    const validationKey = keys.split('.').map(key => key.replace(/\[[^()]*\]/, '')).join('.');
    if (body === null && props[`${validationKey}.allowNull`]) return;
    // check if the equivalent body is undefined
    if (typeof modelBody !== typeof body && body === undefined) {
      errors.push(`${keys} must be present`);
    }
    // check arrays
    else if (Array.isArray(modelBody)) {
      // check if there is a matching array in the body
      if (!Array.isArray(body)) {
        errors.push(`${keys} is not an Array`);
      }
      else {
        // check length of body if there is a constraint on the minLength on the body
        const minLengthConstraint = props[`${validationKey}.minLength`];
        if (body.length < minLengthConstraint) {
          errors.push(`${keys}.length is less than ${minLengthConstraint}`);
        }
        const maxLengthConstraint = props[`${validationKey}.maxLength`];
        if (body.length > maxLengthConstraint) {
          errors.push(`${keys}.length is greater than ${maxLengthConstraint}`);
        }
        // check to see if there are validations that need to be checked for the body
        const validate = props[`${validationKey}[].validate`];
        if (validate) {
          for (let key in validate) {
            // if the validation is a custom validation function
            // but if the validation is not a function, use the validator library
            if (
              (typeof validate[key] === "function" && !validate[key](body)) ||
              (validator[key] && !validator[key](body))
            ) {
              errors.push(`${keys} did not pass ${key} validation`);
            }
          }
        }
        // the first element in the modelBody is compared to every element in the body
        const modelEle = modelBody[0];
        for (let i = 0; i < body.length; i++) {
          compareBodies(modelEle, body[i], props, `${keys}[${i}]`);
        }
      }
    }
    // every key in the modelBody is compared to the equivalent key in the body
    else if (typeof modelBody === 'object' && modelBody !== null) {
      if (!(typeof body === 'object' && body !== null) || Array.isArray(body)) {
        errors.push(`${keys} is not a POJO`);
      }
      else {
        // check to see if there are validations that need to be checked for the body
        const validate = props[`${validationKey}{}.validate`];
        if (validate) {
          for (let key in validate) {
            // if the validation is a custom validation function
            // but if the validation is not a function, use the validator library
            if (
              (typeof validate[key] === "function" && !validate[key](body)) ||
              (validator[key] && !validator[key](body))
            ) {
              errors.push(`${keys} did not pass ${key} validation`);
            }
          }
        }
        for (let key in modelBody) {
          compareBodies(modelBody[key], body[key], props, `${keys}.${key}`);
          // delete the key in the body after deep comparison of the value is done
          delete body[key];
        }
        // any extra keys in the body are not allowed
        for (let key in body) {
          errors.push(`${keys}.${key} is an extra key`);
        }
      }
    }
    else {
      // check to see if there are validations that need to be checked for the body
      const validate = props[`${validationKey}.validate`];
      if (validate) {
        for (let key in validate) {
          // if the validation is a custom validation function
          // but if the validation is not a function, use the validator library
          if (
            (typeof validate[key] === "function" && !validate[key](body)) ||
            (validator[key] && !validator[key](body))
          ) {
            errors.push(`${keys} did not pass ${key} validation`);
          }
        }
      }
      // compare the types of the modelBody and the body
      if (modelBody === null && body !== null) {
        errors.push(`${keys} should be null`);
      }
      else if (typeof modelBody !== typeof body) {
        errors.push(`${keys} should be a ${typeof modelBody}`);
      }
    }
    return;
  }

  compareBodies(modelBody, body, props);

  return errors;
};

async function getCSRFTokens() {
  const res = await fetch(baseUrl.concat("/api/csrf/restore"));
  if (!res.ok) {
    throw new Error('Cannot access GET /api/csrf/restore endpoint')
  }
  const data = await res.json();
  const csrfToken = data.token;
  const _csrf = res.headers.raw()['set-cookie'].find(cookie => cookie.startsWith('_csrf'));
  return { csrfToken, _csrf };
}

async function login(userInfo, csrfTokens) {
  const loginPath = '/session';
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'XSRF-Token': csrfTokens.csrfToken,
      'Cookie': csrfTokens._csrf
    },
    method: 'POST',
    body: JSON.stringify(userInfo)
  };
  const res = await fetch(baseUrl.concat(loginPath), options);
  return res.headers.raw()['set-cookie'];
}

exports.verifyRequestResponse = async function verifyRequestResponse({
  baseUrl,
  method,
  URL,
  request,
  withAuthenticatedUser,
  response: responseData,
}) {
  const { headers, query, body } = request;
  const chain = chai.request(baseUrl)[method.toLowerCase()](URL);
  const csrfTokens = await getCSRFTokens();
  const cookies = [];
  chain.set('XSRF-Token', csrfTokens.csrfToken);
  cookies.push(csrfTokens._csrf);
  if (headers) {
    for (let [key, value] of Object.entries(headers)) {
      chain.set(key, value);
    }
  }
  if (withAuthenticatedUser) {
    const loginCookies = await login(withAuthenticatedUser, csrfTokens);
    cookies.push(loginCookies);
  }
  chain.set('Cookie', cookies.join('; '));
  if (query) chain.query(query);
  if (body) chain.send(body);
  await chain
    .then((res) => {
      expect(
        res,
        `Expected response for ${method} ${URL} to have status code ${responseData.statusCode} but got ${res.statusCode}`
      ).to.have.status(responseData.statusCode);
      if (responseData.headers) {
        expect(
          res,
          `${method} ${URL}`
        ).to.have.headers;
        for (let [key, value] of Object.entries(responseData.headers)) {
          expect(
            res,
            `${method} ${URL}`
          ).to.have.header(key, new RegExp(value));
        }
      }
      const bodyErrors = findBodyErrors(responseData.body, res.body, responseData);
      if (bodyErrors.length) {
        const formattedErrors = JSON.stringify(bodyErrors, null, 2).split('\n').map(function(line){
          return '        ' + line + '\n';
        }).join('');
        expect.fail(`Expected response body for ${method} ${URL} to look like model body but had issues with: \n${formattedErrors}`)
      }
    });
};