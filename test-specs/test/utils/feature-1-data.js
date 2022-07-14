const { isLat, isLng } = require('./custom-validators');

module.exports = {
  "featureName": "Spots Feature",
  "endpoints": [
    {
      "endpointName": "Get all Spots",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 200,
            "body": {
              "Spots": [
                {
                  "id": 1,
                  "ownerId": 1,
                  "address": "123 Disney Lane",
                  "city": "San Francisco",
                  "state": "California",
                  "country": "United States of America",
                  "lat": 37.7645358,
                  "lng": -122.4730327,
                  "name": "App Academy",
                  "description": "Place where web developers are created",
                  "price": 123,
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36",
                  "previewImage": "image url"
                }
              ]
            },
            "body.Spots.minLength": 20,
            "body.Spots.description.allowNull": true,
            "body.Spots.previewImage.allowNull": true,
            "body.Spots.createdAt.validate": {
              "isISO8601": true
            },
            "body.Spots.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Spots.lat.validate": { isLat },
            "body.Spots.lng.validate": { isLng },
            "body.Spots.previewImage.validate": {
              "isURL": true
            },
            "body.page.allowNull": true,
            "body.size.allowNull": true
          }
        }
      ]
    },
    {
      "endpointName": "Get all Spots owned by the Current User",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "authorizedUser": {
        // Fill this out:
        "email": "",
        "password": ""
      },
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 200,
            "body": {
              "Spots": [
                {
                  "id": 1,
                  "ownerId": 1,
                  "address": "123 Disney Lane",
                  "city": "San Francisco",
                  "state": "California",
                  "country": "United States of America",
                  "lat": 37.7645358,
                  "lng": -122.4730327,
                  "name": "App Academy",
                  "description": "Place where web developers are created",
                  "price": 123,
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36",
                  "previewImage": "image url"
                }
              ]
            },
            "body.Spots.minLength": 2,
            "body.Spots.description.allowNull": true,
            "body.Spots.previewImage.allowNull": true,
            "body.Spots.createdAt.validate": {
              "isISO8601": true
            },
            "body.Spots.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Spots.lat.validate": { isLat },
            "body.Spots.lng.validate": { isLng },
            "body.Spots.previewImage.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get details for a Spot from an id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 200,
            "body": {
              "id": 1,
              "ownerId": 1,
              "address": "123 Disney Lane",
              "city": "San Francisco",
              "state": "California",
              "country": "United States of America",
              "lat": 37.7645358,
              "lng": -122.4730327,
              "name": "App Academy",
              "description": "Place where web developers are created",
              "price": 123,
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36",
              "numReviews": 5,
              "avgStarRating": 4.5,
              "Images": [
                {
                  "id": 1,
                  "imageableId": 1,
                  "imageableType": "Review",
                  "url": "image url"
                }
              ],
              "Owner": {
                "id": 1,
                "firstName": "John",
                "lastName": "Smith"
              }
            },
            "body.description.allowNull": true,
            "body.lat.validate": { isLat },
            "body.lng.validate": { isLng },
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Images.minLength": 1,
            "body.Images.url.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get details for a Spot from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Spot with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 404,
            "body": {
              "message": "Spot couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Spot couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create and return a new Spot",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "authorizedUser": {
        "email": "authorized@user.io",
        "password": "password"
      },
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "address": "123 Disney Lane",
              "city": "San Francisco",
              "state": "California",
              "country": "United States of America",
              "lat": 37.7645358,
              "lng": -122.4730327,
              "name": "App Academy",
              "description": "Place where web developers are created",
              "price": 123
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 201,
            "body": {
              "id": 1,
              "ownerId": 1,
              "address": "123 Disney Lane",
              "city": "San Francisco",
              "state": "California",
              "country": "United States of America",
              "lat": 37.7645358,
              "lng": -122.4730327,
              "name": "App Academy",
              "description": "Place where web developers are created",
              "price": 123,
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36" 
            },
            "body.description.allowNull": true,
            "body.lat.validate": { isLat },
            "body.lng.validate": { isLng },
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            }
          }
        },
        {
          "specName": "Request validation errors",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "lat": "An invalid latitude",
              "lng": "An invalid longitude",
              "name": "An invalid, very long name that will result in an error because it is more than 50 characters",
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 400,
            "body": {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "price": "Price per day is required"
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Updates and returns an existing Spot",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "authorizedUser": {
        // Fill this out:
        "email": "",
        "password": ""
      },
      "unauthorizedUser": {
        // Fill this out:
        "email": "",
        "password": ""
      },
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "address": "123 Disney Lane",
              "city": "San Francisco",
              "state": "California",
              "country": "United States of America",
              "lat": 37.7645358,
              "lng": -122.4730327,
              "name": "App Academy",
              "description": "Place where web developers are created",
              "price": 123
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 200,
            "body": {
              "id": 1,
              "ownerId": 1,
              "address": "123 Disney Lane",
              "city": "San Francisco",
              "state": "California",
              "country": "United States of America",
              "lat": 37.7645358,
              "lng": -122.4730327,
              "name": "App Academy",
              "description": "Place where web developers are created",
              "price": 123,
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36" 
            },
            "body.description.allowNull": true,
            "body.lat.validate": { isLat },
            "body.lng.validate": { isLng },
            "body.createdAt.validate": {
              "isISO8601": true
            },
            "body.updatedAt.validate": {
              "isISO8601": true
            }
          }
        },
        {
          "specName": "Request validation errors",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "lat": null,
              "lng": null,
              "name": "An invalid, very long name that will result in an error because it is more than 50 characters",
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 400,
            "body": {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "price": "Price per day is required"
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 400;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Edit details for a Spot from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Spot with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 404,
            "body": {
              "message": "Spot couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Spot couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Delete a Spot",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "authorizedUser": {
        // Fill this out:
        "email": "",
        "password": ""
      },
      "unauthorizedUser": {
        // Fill this out:
        "email": "",
        "password": ""
      },
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 200,
            "body": {
              "message": "Successfully deleted",
              "statusCode": 200
            },
            "body.message.validate": {
              "bodyMessage": function(value){
                return value === "Successfully deleted";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 200;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Get the Deleted Spot",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "specName": "Error Response: Couldn't find a Spot with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 404,
            "body": {
              "message": "Spot couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Spot couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Delete a Spot from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "authorizedUser": {
        // Fill this out:
        "email": "",
        "password": ""
      },
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Spot with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 404,
            "body": {
              "message": "Spot couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Spot couldn't be found";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 404;
              }
            }
          }
        }
      ]
    },
  ]
};