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
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email"),
    check('username')
      .exists({ checkFalsy: true })
      .withMessage("Username is required")
      .bail()
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage("First Name is required"),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage("Last Name is required"),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;

    //User already exists with the specified email
    let emailExists = await User.findOne({ where: {email}});
    if(emailExists) {
      const err = new Error("User already exists");
      err.status = 403;
      err.errors = [
        "User with that email already exists"
      ];
      return next(err);
    };

    //User already exists with the specified username
    let usernameExists = await User.findOne({ where: {username}});
    if(usernameExists) {
      const err = new Error("User already exists");
      err.status = 403;
      err.errors = [
        "User with that username already exists"
      ];
      return next(err);
    }

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
