module.exports = {
  "specName": "Require Authentication",
  "requiredLoginInfo": [
    "email",
    "password"
  ],
  "response": {
    "headers": {
      "Content-Type": "application/json"
    },
    "statusCode": 401,
    "body": {
      "message": "Authentication required",
      "statusCode": 401
    },
    "body.message.validate": {
      "errorMessage": function(value){
        return value === "Authentication required";
      }
    },
    "body.statusCode.validate": {
      "bodyStatusCode": function(value){
        return value === 401;
      }
    }
  }
};