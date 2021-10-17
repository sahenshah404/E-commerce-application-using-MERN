const express = require("express");
const router = express.Router();
const UserModel = require("../modules/db/UserModel");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


router.post("/", async (req, res) => {
    let { email, password } = req.body;

    let user = await UserModel.findOne({ email: email });
    if (!user) {
        res.status(401).json({ errorMessage: "Wrong Credential" });
    } else {
        let auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            res.status(401).json({ errorMessage: "Wrong Credential" });
        } else {
            let token = await jwt.sign({
                name:user.name,
                email: user.email,
                userType: user.userType
            }, process.env.SECRET);

            res.cookie("token", token, {
                httpOnly: true
            }).send();

        }
    }
})

router.get("/status",(req,res)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            res.json(false);
        }else{
            const verified = jwt.verify(token,process.env.SECRET);
            res.json(true)
        }
        
    } catch (error) {
        res.json(false);
    }
})

module.exports = router;