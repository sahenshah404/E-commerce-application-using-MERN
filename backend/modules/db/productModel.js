const mongoose = require("mongoose");

const products = new mongoose.Schema({
    name: {type: String, required: [true, "Please Enter Name"] },
    price: {type: Number, required: [true, "Please Enter Price"] },
    desc: String,
    rating: {type: Number, default:0},
    review: [{
        name:{type:String,required:true},
        rating:{type:Number,required:true},
        comment:{type:String,default:""}
    }],
    category: String,
    stock: {type: Number, default: 1 },
    images: {type: [], required: [true, "Please provide Images"] },
    sellerId:String
});

const ProductModel =new mongoose.model("Product", products);

module.exports = ProductModel;