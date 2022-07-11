module.exports = {
  "featureName": "Reviews Feature",
  "endpoints": [
    {
      "endpointName": "Get all Reviews for a Spot by Spot id",
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
            "statusCode": "200",
            "body": {
              "Reviews": [
                {
                  "id": 1,
                  "userId": 1,
                  "spotId": 1,
                  "review": "This was an awesome spot!",
                  "stars": 5,
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36" ,
                  "User": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Smith"
                  },
                  "images": [
                    "image url"
                  ]
                }
              ]
            },
            "body.Reviews.createdAt.validate": {
              "isISO8601": true
            },
            "body.Reviews.updatedAt.validate": {
              "isISO8601": true
            },
          }
        }
      ]
    },
    {
      "endpointName": "Get all Reviews for a Spot from a non-existent id",
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
      "endpointName": "Get all Reviews written by the Current User",
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
              "Reviews": [
                {
                  "id": 1,
                  "userId": 1,
                  "spotId": 1,
                  "review": "This was an awesome spot!",
                  "stars": 5,
                  "createdAt": "2021-11-19 20:39:36",
                  "updatedAt": "2021-11-19 20:39:36" ,
                  "User": {
                    "id": 1,
                    "firstName": "John",
                    "lastName": "Smith"
                  },
                  "images": [
                    "image url"
                  ]
                }
              ]
            },
            "body.Reviews.minLength": 2,
            "body.Reviews.createdAt.validate": {
              "isISO8601": true
            },
            "body.Reviews.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Reviews.images.validate": {
              "isURL": true
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create and return a new Review for a specified Spot",
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
              "review": "This was an awesome spot!",
              "stars": 5
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "userId": 1,
              "spotId": 1,
              "review": "This was an awesome spot!",
              "stars": 5,
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
              "stars": 10,
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
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5"
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create a Review for a Spot from a non-existent id",
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
      "endpointName": "Create a Review for a Spot that the Current User already reviewed",
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
              "review": "This was an awesome spot!",
              "stars": 5
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "403",
            "body": {
              "message": "User already has a review for this spot",
              "statusCode": 403
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "User already has a review for this spot";
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
      "endpointName": "Updates and returns an existing Review",
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
              "review": "This was a good spot!",
              "stars": 4,
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": "200",
            "body": {
              "id": 1,
              "userId": 1,
              "spotId": 1,
              "review": "This was a good spot!",
              "stars": 4,
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
              "stars": 10,
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
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5"
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Edit details for a Review from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Review with the specified id",
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
              "message": "Review couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Review couldn't be found";
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
      "endpointName": "Delete a Review",
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
      "endpointName": "Delete a Review from a non-existent id",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": true,
      "specs": [
        {
          "specName": "Error Response: Couldn't find a Review with the specified id",
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
              "message": "Review couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Review couldn't be found";
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