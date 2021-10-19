const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
    res.clearCookie("token").send();
    })


module.exports = router;