const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const currentUserRouter = require("./me.js");
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/me", currentUserRouter);



// TEMP STATIC TEST RESPONSES

router.get('/spots', (req, res) => {
  res.json({
    Spots: new Array(20).fill(
      {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Drive",
        // "address": "123 Disney Lane",
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
        "previewImage": "www.test.com",
      }
    )
  })
});

router.get('/spots/1', (req, res) => {
  res.json({
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
    "images": [
      "www.test.com"
    ],
    // "images": "www.google.com",
    "Owner": {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith"
    }
  })
});
router.get('/spots/:id([0-9])', (req, res) => {
  if (req.id > 0){
    res.json({
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
      "images": [
        "www.test.com"
      ],
      "Owner": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      }
    })
  } else {
    res.statusCode = 404;
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    });
  }
});

router.post('/login', (req, res) => {
  res.json({
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "token": "fakeToken"
    });
});




router.get('/me/spots', (req, res) => {
  console.log(req.cookies.token);
  res.json({
    Spots: new Array(20).fill(
      {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Drive",
        // "address": "123 Disney Lane",
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
        "previewImage": "www.test.com",
      }
    )
  })
})

router.post('/spots', (req, res) => {
  console.log(req.cookies.token);
  res.status(201);
  res.json({
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
  })
})

router.put('/spots/:id([0-9])', (req, res) => {
  console.log(req.cookies.token);
  res.status(201);
  res.json({
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
  })
})


module.exports = router;