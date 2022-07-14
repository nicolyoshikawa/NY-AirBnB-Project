const { isLat, isLng } = require('./custom-validators');

module.exports = {
  "featureName": "Images Feature",
  "endpoints": [
    {
      "endpointName": "Create an Image for a Spot by id",
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
              "url": "image url"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 200,
            "body": {
              "id": 1,
              "imageableId": 1,
              "imageableType": "Spot",
              "url": "image url",
            },
            "body.url.validate": {
              "isURL": true
            },
            "body.imageableType.validate": {
              "imageableType": function(value){
                return value === "Spot";
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create an Image for a Spot from a non-existent id",
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
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "url": "image url"
            }
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
      "endpointName": "Create an Image for a Review by id",
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
              "url": "image url"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 200,
            "body": {
              "id": 1,
              "imageableId": 1,
              "imageableType": "Review",
              "url": "image url",
            },
            "body.url.validate": {
              "isURL": true
            },
            "body.imageableType.validate": {
              "imageableType": function(value){
                return value === "Review";
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create an Image for a Review from a non-existent id",
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
          "specName": "Error Response: Couldn't find a Review with the specified id",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "url": "image url"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 404,
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
      "endpointName": "Get all the reviews for a Spot by id where at least one review has 10 images",
      // Fill this out:
      "method": "",
      "URL": "",
      "requireAuthentication": false,
      "specs": [
        {
          "specName": "Successful Response - At least one review has 10 images",
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
                  "Images": [
                    {
                      "id": 1,
                      "imageableId": 1,
                      "imageableType": "Review",
                      "url": "image url"
                    }
                  ]
                }
              ]
            },
            "body.Reviews.minLength": 1,
            "body.Reviews.createdAt.validate": {
              "isISO8601": true
            },
            "body.Reviews.updatedAt.validate": {
              "isISO8601": true
            },
            "body.Reviews.Images.minLength": 1,
            "body.Reviews.Images.url.validate": {
              "isURL": true
            },
            "body.Reviews[].validate": {
              hasOneReviewWith10Images(value) {
                for (let review of value) {
                  if (!review || !review.Images) return false;
                  if (review.Images.length === 10) return true;
                }
                return false;
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Create an Image for a Review that has reached its 10 image limit",
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
          "specName": "Error Response: Maximum number of images for this resource was reached",
          "request": {
            "query": null,
            "headers": {
              "Content-Type": "application/json"
            },
            "body": {
              "url": "image url"
            }
          },
          "response": {
            "headers": {
              "Content-Type": "application/json"
            },
            "statusCode": 403,
            "body": {
              "message": "Maximum number of images for this resource was reached",
              "statusCode": 403
            },
            "body.message.validate": {
              "errorMessage": function(value){
                return value === "Maximum number of images for this resource was reached";
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
      "endpointName": "Delete an Image",
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
        },
        {
          "specName": "Error Response: Delete a non-existent image",
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
              "message": "Image couldn't be found",
              "statusCode": 404
            },
            "body.message.validate": {
              "bodyMessage": function(value){
                return value === "Image couldn't be found";
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
      "endpointName": "Add Pagination Query Filters to Get All Spots",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Success Response",
          "request": {
            "query": {
              "page": 2,
              "size": 4,
            },
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
            "body.Spots.minLength": 1,
            "body.Spots.maxLength": 4,
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
          }
        }
      ]
    },
    {
      "endpointName": "Add Latitude and Longitude Query Filters to Get All Spots",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Success Response",
          "request": {
            "query": {
              "minLat": 37,
              "maxLat": 38,
              "minLng": -123,
              "maxLng": -122
            },
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
            "body.Spots.minLength": 1,
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
            "body.Spots[].validate": {
              isProperlyFiltered(value) {
                const minLat = 37;
                const maxLat = 38;
                const minLng = -123;
                const maxLng = -122;
                for (let spot of value) {
                  if (spot.lat > maxLat || spot.lat < minLat) {
                    return false;
                  }
                  if (spot.lng > maxLng || spot.lng < minLng) {
                    return false;
                  }
                  return true;
                }
              }
            }
          }
        }
      ]
    },
    {
      "endpointName": "Add Price Query Filters to Get All Spots",
      // Fill this out:
      "method": "",
      "URL": "",
      "requiresAuthentication": false,
      "specs": [
        {
          "specName": "Success Response",
          "request": {
            "query": {
              "minPrice": 120,
              "maxPrice": 130,
            },
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
            "body.Spots.minLength": 1,
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
            "body.Spots[].validate": {
              isProperlyFiltered(value) {
                const minPrice = 120;
                const maxPrice = 130;
                for (let spot of value) {
                  if (spot.price > maxPrice || spot.price < minPrice) {
                    return false;
                  }
                  return true;
                }
              }
            }
          }
        }
      ]
    },
  ]
};