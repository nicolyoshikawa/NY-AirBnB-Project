const chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const baseUrl = process.env.BASE_URL;
const { featureName, endpoints } = require('./utils/feature-1-data');
const { findBodyErrors } = require('./utils');
const { login } = require('./utils/auth');

describe(featureName, () => {
  for (let { endpointName, method, URL, specs, requiresAuthentication } of endpoints) {
    describe(`${endpointName} - ${method} ${URL}`, () => {
      let currentUserId, token;
      beforeEach(async function() {
        if (requiresAuthentication) {
          // TODO: make a modular test spec in utils that tests authentication
          const loginRes = await login('/session');
          currentUserId = loginRes.id;
          token = loginRes.token;
        }
      });
      for (let { request, response, specName } of specs) {
        it(specName, async () => {
          const chain = chai.request(baseUrl)[method.toLowerCase()](URL);
          if (request.headers) {
            for (let [key, value] of Object.entries(request.headers)) {
              chain.set(key, value);
            }
          }
          if (requiresAuthentication) chain.set('Cookie', `token=${token}`);
          if (request.query) chain.query(request.query);
          if (request.body) chain.send(request.body);
          await chain
            .then((res) => {
              expect(res).to.have.status(response.statusCode);
              if (response.headers) {
                expect(res).to.have.headers;
                for (let [key, value] of Object.entries(response.headers)) {
                  expect(res).to.have.header(key, new RegExp(value));
                }
              }
              const bodyErrors = findBodyErrors(response.body, res.body, response);
              if (bodyErrors.length) {
                const formattedErrors = JSON.stringify(bodyErrors, null, 2).split('\n').map(function(line){
                  return '        ' + line + '\n';
                }).join('');
                expect.fail(`Expected body to look like model body but had issues with: \n${formattedErrors}`)
              }
            });
        });
      }
    });
  }
});