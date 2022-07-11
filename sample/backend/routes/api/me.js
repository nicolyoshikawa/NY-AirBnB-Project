const express = require("express");
// const { check } = require("express-validator");

// const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
// const { User } = require("../../db/models");

const router = express.Router();

router.get('', requireAuth, async (req, res) => {
  const { id, firstName, lastName, email } = req.user;
  return res.json({
    id,
    firstName,
    lastName,
    email
  })
});

module.exports = router;