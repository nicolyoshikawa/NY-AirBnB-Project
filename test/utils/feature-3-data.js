const { isLat, isLng } = require('./custom-validators');

module.exports = {
  "featureName": "Bookings Feature",
  "endpoints": [
    {
      "endpointName": "Get all Bookings for a Spot by Spot id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response if NOT the owner",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "Bookings": [
                {
                  "spotId": 1,
                  "startDate": "2021-11-19",
                  "endDate": "2021-11-19"
                }
              ]
            },
          }
        },
        {
          "specName": "Successful Response if you ARE the owner",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "Bookings": [
                {
                  "User": {
                    "id": 2,
                    "firstName": "John",
                    "lastName": "Smith"
                  },
                  "id": 1,
                  "spotId": 1,
                  "userId": 2,
                  "startDate": "2021-11-19",
                  "endDate": "2021-11-19",
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36"
                }
              ]
            }
          }
        },
      ]
    },
    {
      "endpointName": "Get all Bookings for a Spot from a non-existent id",
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
            "statusCode": "404",
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
      "endpointName": "Get all Bookings made by the Current User",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
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
            "statusCode": "200",
            "body": {
              "Bookings": [
                {
                  "id": 1,
                  "spotId": 1,
                  "Spot": {
                    "id": 1,
                    "ownerId": 1,
                    "address": "123 Disney Lane",
                    "city": "San Francisco",
                    "state": "California",
                    "country": "United States of America",
                    "lat": 37.7645358,
                    "lng": -122.4730327,
                    "name": "App Academy",
                    "price": 123,
                    "previewImage": "image url"
                  },
                  "userId": 2,
                  "startDate": "2021-11-19",
                  "endDate": "2021-11-19",
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36"
                }
              ]
            },
            "body.Reviews.minLength": 2,
            "body.Bookings.createdAt.validate": {
              "isISO8601": true
            },
            "body.Bookings.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Bookings.Spot.previewImage.validate": {
              "isURL": true
            },
            "body.Bookings.Spot.lat.validate": { isLat },
            "body.Bookings.Spot.lng.validate": { isLng },
          }
        }
      ]
    },
    {
      "endpointName": "Create and return a new Booking for a specified Spot",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "startDate": "2021-11-19",
              "endDate": "2021-11-19"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "spotId": 1,
              "userId": 2,
              "startDate": "2021-11-19",
              "endDate": "2021-11-19",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-19 20:39:36"
            },
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
              "startDate": "2030-11-19",
              "endDate": "2030-11-17"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "endDate": "endDate cannot come before startDate",
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create a Booking for a Spot from a non-existent id",
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
            "body": {
              "startDate": "2021-11-19",
              "endDate": "2021-11-19"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
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
      "endpointName": "Create a Booking for a Spot with a date conflict",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Duplicate Review Prohibited",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "startDate": "2021-11-19",
              "endDate": "2021-11-19"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "403",
            "body": {
              "message": "Sorry, this spot is already booked for the specified dates",
              "statusCode": 403,
              "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
              }
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Sorry, this spot is already booked for the specified dates";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 403;
              }
            }
          }
        },
      ]
    },
    {
      "endpointName": "Updates and returns an existing Booking",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
      "specs": [
        {
          "specName": "Successful Response",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "startDate": "2021-11-19",
              "endDate": "2021-11-19"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "spotId": 1,
              "userId": 2,
              "startDate": "2021-11-19",
              "endDate": "2021-11-19",
              "createdAt": "2021-11-19 20:39:36",
              "updatedAt": "2021-11-20 10:06:40"
            },
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
              "startDate": "2030-11-19",
              "endDate": "2030-11-17"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "endDate": "endDate cannot come before startDate",
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Edit details for a Booking from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a booking with the specified id",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "startDate": "2021-11-19",
              "endDate": "2021-11-19"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Booking couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Booking couldn't be found";
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
      "endpointName": "Edit details for a Booking past the endDate",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Past bookings can't be modified",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "startDate": "2021-11-19",
              "endDate": "2021-11-19"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Past bookings can't be modified",
              "statusCode": 400
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Past bookings can't be modified";
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
      "endpointName": "Edit details for a Booking to create a booking conflict",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Sorry, this spot is already booked for the specified dates",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "startDate": "2021-11-19",
              "endDate": "2021-11-19"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "403",
            "body": {
              "message": "Sorry, this spot is already booked for the specified dates",
              "statusCode": 403
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Sorry, this spot is already booked for the specified dates";
              }
            },
            "body.statusCode.validate": {
              "bodyStatusCode": function(value){
                return value === 403;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Delete a Booking",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "requiresAuthorization": true,
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
            "statusCode": "200",
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
      "endpointName": "Delete a Booking from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Booking with the specified id",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "404",
            "body": {
              "message": "Booking couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Booking couldn't be found";
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
      "endpointName": "Delete a Booking that has already started",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Bookings that have been started can't be deleted",
          "request": {
            "query": null,
            "headers": null,
            "body": null
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "400",
            "body": {
              "message": "Bookings that have been started can't be deleted",
              "statusCode": 400
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Bookings that have been started can't be deleted";
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
  ]
};