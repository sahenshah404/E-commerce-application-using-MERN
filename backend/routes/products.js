const express = require("express");
const router = express.Router();
const ProductModel = require("../modules/db/productModel");

var jwt = require('jsonwebtoken');
const UserModel = require("../modules/db/UserModel")

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

router.get("/id/:id/buy/bought", async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).send();
        } else {
            const verified = jwt.verify(token, process.env.SECRET);
            const userEmail = verified.email;
            let user = await UserModel.findOne({ email: userEmail });

            ProductModel.findByIdAndUpdate(req.params.id, { $inc: { stock: -1 } }).then(async (d) => {
                if (d.stock < 1) {
                    res.status(205).send();
                } else {
                    let date = new Date();
                    date = date.toLocaleString();
                    let order = {
                        productId: req.params.id,
                        quantity: 1,
                        time: date
                    }
                    await user.orders.push(order);
                    await user.save()
                    res.send();
                }

            })
        }
    } catch (error) {
        res.sendStatus(401);
    }

});

router.get("/myorders", async (req, res) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).send();
        } else {
            const verified = jwt.verify(token, process.env.SECRET);
            const userEmail = verified.email;
            let user = await UserModel.findOne({ email: userEmail });
            let orderList = user.orders;
            let orders = [];

            for (const element of orderList) {
                let d= await ProductModel.findById(element.productId);
                    orders.push({
                        productId: element.productId,
                        name: d.name,
                        image: d.images[0],
                        quantity: element.quantity,
                        time: element.time
                    });
                
            };
            res.json(orders);
        }
    } catch (error) {
        res.sendStatus(401);
    }

});



module.exports = router;