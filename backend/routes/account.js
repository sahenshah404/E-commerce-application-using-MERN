const express = require("express");
const router = express.Router();

const UserModel = require("../modules/db/UserModel")
var jwt = require('jsonwebtoken');

router.get("/logout", (req, res) => {
    res.clearCookie("token").send();
});

router.get("/profile", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(402).json(false);
        } else {
            const verified = jwt.verify(token, process.env.SECRET);
            const userEmail = verified.email;
            let user = await UserModel.findOne({ email: userEmail });
            userData = {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                userType: user.userType
            };
            res.status(200).json(userData);
        }

    } catch (error) {
        res.status(401).json(false);
    }
})


module.exports = router;