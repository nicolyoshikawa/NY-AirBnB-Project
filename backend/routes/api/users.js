// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// Sign up
router.post('', async (req, res) => {
    const { email, hashedPassword, username, firstName, lastName } = req.body;
    const password = bcrypt.hashSync(hashedPassword);
    const user = await User.create({ email, username, password, firstName, lastName });

    const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

module.exports = router;
