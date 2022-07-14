module.exports = {
  "specName": "Require Proper Authorization",
  "response": {
    "headers": {
      "Content-Type": "application/json"
    },
    "statusCode": 403,
    "body": {
      "message": "Forbidden",
      "statusCode": 403
    },
    "body.message.validate": {
      "errorMessage": function(value){
        return value === "Forbidden";
      }
    },
    "body.statusCode.validate": {
      "bodyStatusCode": function(value){
        return value === 403;
      }
    }
  }
};