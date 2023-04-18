// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    //User already exists with the specified email
    // let emailExists = await User.findOne({ where: {email}});
    // if(emailExists) {
    //   res.status(403);
    //   return res.json({
    //     "message": "User already exists",
    //     "statusCode": 403,
    //     "errors": [
    //       "User with that email already exists"
    //     ]
    //   });
    // };

    //User already exists with the specified username
    // let usernameExists = await User.findOne({ where: {username}});
    // if(usernameExists) {
    //   res.status(403);
    //   return res.json({
    //     "message": "User already exists",
    //     "statusCode": 403,
    //     "errors": [
    //       "User with that username already exists"
    //     ]
    //   });
    // }

    //Body validation errors
    // if(!username) {
    //   res.status(400);
    //   return res.json({
    //     "message": "Validation error",
    //     "statusCode": 400,
    //     "errors": [
    //       "Username is required"
    //     ]
    //   });
    // }
    // if(!firstName) {
    //   res.status(400);
    //   return res.json({
    //     "message": "Validation error",
    //     "statusCode": 400,
    //     "errors": [
    //       "First Name is required"
    //     ]
    //   });
    // }
    // if (!lastName) {
    //   res.status(400);
    //   return res.json({
    //     "message": "Validation error",
    //     "statusCode": 400,
    //     "errors": [
    //       "Last Name is required"
    //     ]
    //   });
    // }

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, password: hashedPassword, firstName, lastName });

    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    };

    let token = await setTokenCookie(res, safeUser);

    safeUser.token = token;

    return res.json({
        user: safeUser
    });
});

module.exports = router;
