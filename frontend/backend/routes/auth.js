const express = require('express')
const bcrypt = require("bcryptjs")
const router = express.Router()
var jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")
const User = require("../models/user")
const { body, validationResult } = require("express-validator")
const JWT_SECRET = "wfdfsdfdsf"
router.post("/creatuser", [
    body('email', 'enter invalid email').isEmail(),
    body('name', 'adsad').isLength({ min: 5 }),
    body('password', 'password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(450).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'sorry, a user with this email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const sepass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: sepass,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(400).send('some error occurred');
    }
});
//authenticateuser
router.post('/login', [
    body('email', 'enter invalid email').isEmail(),
    body('password', 'incorrect assword').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try again" })
        }
        const passcomp = await bcrypt.compare(password, user.password)
        if (!passcomp) {
            return res.status(400).json({ error: "please try again" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        let success = true
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message)
        success = false
        res.json({ success, authtoken })
        res.status(400).send("server error")
    }
})
//rotes 3 get logged in user detial
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(400).send("server error")
    }
})

module.exports = router