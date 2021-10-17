const express = require("express");
const router = express.Router();
const path = require("path");
var bcrypt = require('bcryptjs');

const productModel = require("../modules/db/productModel");
const UserModel = require("../modules/db/UserModel")

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

router.post("/product", upload.array('images', 12), function async(req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  let data = JSON.stringify(req.body);
  data = JSON.parse(data);
  let img = req.files.map(img => "/images/" + img.filename)
  const item = new productModel({
    name: data.name,
    price: data.price,
    desc: data.desc,
    category: data.category,
    stock: data.stock,
    images: img
  });
  let documentCreated = item.save();
  res.status(200).json(documentCreated);
});


router.post("/user", async (req, res) => {

  let { name, email, password, mobile } = req.body;

  let salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash(password, salt)
  const user = await new UserModel({
    name: name,
    email: email,
    password: hashedPassword,
    UserType: "consumer",
    mobile: mobile
  });

  let User = await user.save();
  res.json(User);


})


module.exports = router;