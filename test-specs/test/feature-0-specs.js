const chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const baseUrl = process.env.BASE_URL;
const dataFile = 'feature-0-data.js';
const { featureName, endpoints } = require(`./utils/${dataFile}`);
const { requiredLoginInfo, response: authenticationResponse } = require('./utils/require-authentication-spec-data');
const { response: authorizationResponse } = require('./utils/require-authorization-spec-data');
const { verifyRequestResponse } = require('./utils');

describe(featureName, () => {
  for (let endpointSpecs of endpoints) {
    const {
      endpointName,
      method,
      URL,
      specs,
      requiresAuthentication,
      requiresAuthorization,
      requiresLogin,
      authorizedUser,
      unauthorizedUser,
    } = endpointSpecs;
    describe(`${endpointName} - ${method} ${URL}`, () => {
      // Make sure student filled out the method and URL for in the test data
      if (!method || !URL) throw new Error(`Please make sure to fill out "method" and "URL" properties for the "${endpointName}"'s object in the file "${dataFile}".`);
      if (requiresAuthorization) {
        it (`Requires Authorization`, async () => {
          expect(unauthorizedUser, `Make sure there is an "unauthorizedUser" property on "${endpointName}"'s object in the file "${dataFile}"`).to.not.be.undefined;
          expect(unauthorizedUser,
            `Make sure there are ${requiredLoginInfo.map(key => `"${key}"`).join(" and ")} key${requiredLoginInfo.length > 1 && "s"} in the "unauthorizedUser" object as a property on "${endpointName}"'s object in the file "${dataFile}"`
          ).to.have.all.keys(...requiredLoginInfo);
          for (let key of requiredLoginInfo) {
            expect(unauthorizedUser, `Fill out "${key}" key in the "unauthorizedUser" object as a property on "${endpointName}"'s object in the file "${dataFile}"`).to.have.property(key).and.to.be.a('string').to.have.lengthOf.at.least(1);
          }
          await verifyRequestResponse({
            baseUrl,
            method,
            URL,
            request: specs[0].request,
            withAuthenticatedUser: unauthorizedUser,
            response: authorizationResponse
          });
        });
      }
      if (requiresAuthentication) {
        it (`Requires Authentication`, async () => {
          expect(authorizedUser, `Make sure there is an "authorizedUser" property on "${endpointName}"'s object in the file "${dataFile}"`).to.not.be.undefined;
          expect(authorizedUser,
            `Make sure there are ${requiredLoginInfo.map(key => `"${key}"`).join(" and ")} key${requiredLoginInfo.length > 1 && "s"} in the "authorizedUser" object as a property on "${endpointName}"'s object in the file "${dataFile}"`
          ).to.have.all.keys(...requiredLoginInfo);
          for (let key of requiredLoginInfo) {
            expect(authorizedUser, `Fill out the "${key}" key in the "authorizedUser" object as a property on "${endpointName}"'s object in the file "${dataFile}"`).to.have.property(key).and.to.be.a('string').to.have.lengthOf.at.least(1);
          }
          await verifyRequestResponse({
            baseUrl,
            method,
            URL,
            request: specs[0].request,
            withAuthenticatedUser: false,
            response: authenticationResponse
          });
        });
      }

      if (requiresLogin) {
        it (`Requires Logged In User`, async () => {
          expect(authorizedUser, `Make sure there is an "authorizedUser" property on "${endpointName}"'s object in the file "${dataFile}"`).to.not.be.undefined;
          expect(authorizedUser,
            `Make sure there are ${requiredLoginInfo.map(key => `"${key}"`).join(" and ")} key${requiredLoginInfo.length > 1 && "s"} in the "authorizedUser" object as a property on "${endpointName}"'s object in the file "${dataFile}"`
          ).to.have.all.keys(...requiredLoginInfo);
          for (let key of requiredLoginInfo) {
            expect(authorizedUser, `Fill out the "${key}" key in the "authorizedUser" object as a property on "${endpointName}"'s object in the file "${dataFile}"`).to.have.property(key).and.to.be.a('string').to.have.lengthOf.at.least(1);
          }
        });
      }

      // For each of the requirements
      for (let spec of specs) {
        const { request, response, specName } = spec;

        it (specName, async () => {
          await verifyRequestResponse({
            baseUrl,
            method,
            URL,
            request,
            withAuthenticatedUser: authorizedUser,
            response
          });
        });
      }
    });
  }
});