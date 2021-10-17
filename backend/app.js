const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Global MiddleWare
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
require('dotenv').config();

//Modules
const  ProductModel  = require("./modules/db/productModel");

//Routing File
const create = require("./routes/create");
const products = require("./routes/products");
const login = require("./routes/login")

//Routes
app.use("/create",create);
app.use("/products",products)
app.use("/login",login)

mongoose.connect(process.env.DBURL);

app.get("/home", (req, res) => {
    ProductModel.aggregate([{ $sample: { size: 12 } }]).then((d)=>{
        res.json(d);
    });

});



app.listen(process.env.PORT || 5000, () => {
    console.log("listening to port 5000");
});