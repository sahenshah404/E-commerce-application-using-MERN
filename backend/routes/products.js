const express = require("express");
const router = express.Router();
const ProductModel = require("../modules/db/productModel");


router.get("/id/:id", (req, res) => {
    ProductModel.findById(req.params.id).then((d) => {
        res.json(d);
    })
});

router.get("/cat/:category", (req, res) => {

    ProductModel.aggregate([
        { $match: { category: req.params.category } },
        { $sample: { size: 12 } }
    ]).then((d) => {
        res.json(d);
    })

});


module.exports = router;