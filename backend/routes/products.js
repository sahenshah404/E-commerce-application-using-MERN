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
            let prod = await ProductModel.findById(req.params.id);

            if (prod.stock > 0) {
                ProductModel.findByIdAndUpdate(req.params.id, { $inc: { stock: -1 } }).then(async (d) => {
                    let date = new Date();
                    date = date.toLocaleString();
                    let order = {
                        productId: req.params.id,
                        quantity: 1,
                        time: date
                    }
                    await user.orders.push(order);
                    await user.save()
                    let sellerId = await prod.sellerId;
                    let seller = await UserModel.findById(sellerId);
                    await seller.sales.push(prod._id.toString());
                    await seller.save();
                    res.send();


                })

            }
            else {
                res.status(205).send();
            }
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
                let d = await ProductModel.findById(element.productId);
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


router.get("/myproducts", async (req, res) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).send();
        } else {
            const verified = jwt.verify(token, process.env.SECRET);
            const userEmail = verified.email;
            let user = await UserModel.findOne({ email: userEmail });
            let productList = user.products;
            let products = [];
            
            for (const element of productList) {
                let d = await ProductModel.findById(element);
                products.push({
                    productId: element,
                    name: d.name,
                    image: d.images[0],
                    quantity: d.stock,
                    price:d.price
                });

            };
            res.json(products);
        }
    } catch (error) {
        res.sendStatus(401);
    }

});

router.get("/mysales", async (req, res) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).send();
        } else {
            const verified = jwt.verify(token, process.env.SECRET);
            const userEmail = verified.email;
            let user = await UserModel.findOne({ email: userEmail });
            let saleList = user.sales;
            let sales = [];
            
            for (const element of saleList) {
                let d = await ProductModel.findById(element);
                sales.push({
                    productId: element,
                    name: d.name,
                    image: d.images[0],
                    quantity: d.stock,
                    price:d.price
                });

            };
            res.json(sales);
        }
    } catch (error) {
        res.sendStatus(401);
    }

});



module.exports = router;