const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {type: String, required: [true, "Please Enter Name"] },
    email: {type: String, required:[true,"Please enter email"],unique:true},
    password: {type: String, required: [true, "Please Enter Name"] },
    mobile:Number,
    adress:String,
    userType:String,
    orders:[]
});

const UserModel =new mongoose.model("user", user);

module.exports = UserModel;