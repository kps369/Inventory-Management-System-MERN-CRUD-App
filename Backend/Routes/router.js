const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const authMiddleware = require('../middleware/authMiddleware');

//Inserting(Creating) Data:
router.post("/insertproduct", authMiddleware, async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })

        if (pre) {
            return res.status(422).json({ error: "Product is already added." });
        }
        else {
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode })

            await addProduct.save();
            return res.status(201).json(addProduct)
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

//Getting(Reading) Data:
router.get('/products', authMiddleware, async (req, res) => {
    const { search } = req.query;
    let query = {};

    if (search) {
        query.ProductName = { $regex: search, $options: 'i' }; // Case-insensitive regex search
    }

    try {
        const getProducts = await products.find(query);
        return res.status(200).json(getProducts);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

//Getting(Reading) individual Data:
router.get('/products/:id', authMiddleware, async (req, res) => {

    try {
        const getProduct = await products.findById(req.params.id);
        return res.status(200).json(getProduct);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

//Editing(Updating) Data:
router.put('/updateproduct/:id', authMiddleware, async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const updateProducts = await products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductBarcode }, { new: true });
        return res.status(200).json(updateProducts);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

//Deleting Data:
router.delete('/deleteproduct/:id', authMiddleware, async (req, res) => {

    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        return res.status(200).json(deleteProduct);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;