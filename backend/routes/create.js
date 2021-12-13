const express = require("express");
const router = express.Router();
const path = require("path");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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

router.post("/product", upload.array('images', 12), async function (req, res) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any

  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send();
    } else {
      const verified = jwt.verify(token, process.env.SECRET);
      const userEmail = verified.email;
      let user = await UserModel.findOne({ email: userEmail });
      let userId = user._id;

      let data = JSON.stringify(req.body);
      data = JSON.parse(data);
      let img = req.files.map(img => "/images/" + img.filename)
      const item = new productModel({
        name: data.name,
        price: data.price,
        desc: data.desc,
        category: data.category,
        stock: data.stock,
        images: img,
        sellerId: userId
      });
      let documentCreated = await item.save();
      await user.products.push(documentCreated._id.toString());
      await user.save();
      res.status(200).json(documentCreated);
    };

  } catch (error) {
    res.sendStatus(401);
  }
});


router.post("/user", async (req, res) => {

  let { name, email, password, mobile } = req.body;

  let USER = await UserModel.findOne({ email: email });
  if (!USER) {
    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt)
    const user = await new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      userType: "user",
      mobile: mobile
    });

    let User = await user.save();
    res.json(User);
  } else {
    res.status(403).send();
  }

})


module.exports = router;