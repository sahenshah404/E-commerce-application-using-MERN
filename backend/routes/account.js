const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
    res.clearCookie("token").send();
    console.log("cookies cleared");
    })


module.exports = router;