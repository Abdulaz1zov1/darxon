const Product = require('../models/Products')
const fs = require('fs');
const path = require('path');

exports.addProduct = async (req, res) => {
    try {
        const result = new Product({
            name: req.body.name,
            description: req.body.description,
            categoryName: req.body.categoryName,
            categoryID: req.body.categoryID,
            image: `/public/uploads/${req.file.filename}`,
            price: req.body.price,
            details: req.body.details
        });
        result.save()
            .then(() => {
                res.status(201).json({ message: "Data is  created", data: result })
            })
            .catch((error) => {
                res.status(400).json({ message: "Data is not created", data: error })
            })
    } catch (error) {
        res.status(500).json({ message: "Something with wrong", error: error })
    }
}

exports.getAllProduct = async (req, res) => {
    try {
        const result = await Product.find()
            .sort({ createdAt: -1 })
        res.status(200).json({ message: "Product find all ", data: result })
    } catch (error) {
        res.status(500).json({ message: "Something with wrong", error: error })
    }
}

exports.getByCategory = async (req, res) => {
    try {
        const result = await Product.find({ categoryName: req.query.category }).sort({ createdAt: -1 })
        res.status(200).json({ message: "Product find By Category ", data: result })
    } catch (error) {
        res.status(500).json({ message: "Something with wrong", error: error })
    }
}


exports.getById = async (req, res) => {
    try {
        const result = await Product.findById(req.params.id)
        res.status(200).json({ message: "Product find BY ID ", data: result })
    } catch (error) {
        res.status(500).json({ message: "Something with wrong", error: error })
    }
}
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id)
        product.price = req.body.price
        product.name = req.body.name
        product.categoryName = req.body.categoryName
        product.description = req.body.description
        product.details = req.body.details
        product.save({ validateBeforeSave: false })
            .then(() => {
                res.status(200).json({ message: "Data is  updated", data: product })
            })
            .catch((error) => {
                res.status(400).json({ message: "Data is not updated", data: error })
            })
    } catch (error) {
        res.status(500).json({ message: "Something with wrong", error: error })
    }
}

exports.updateIsExistField = async (req, res) => {
    try {
        let check;
        const product = await Product.findByIdAndUpdate(req.params.id)
        if(product.isExist == true){
            check = false;
        }else{
            check = true;
        }
        product.isExist = check
        product.save({ validateBeforeSave: false })
            .then(() => {
                res.status(200).json({ message: "Data is  updated", data: product })
            })
            .catch((error) => {
                res.status(400).json({ message: "Data is not updated", data: error })
            })
    } catch (error) {
        res.status(500).json({ message: "Something with wrong", error: error })
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        // await Product.findById(req.params.id)
        //     .exec(async (error, data) => {
        //      if (error) {
        //         res.status(400).json({ message: "Data is not deleted", error: error })
        //      } else {
        //         // console.log(data)
        //       let filePath = path.join(path.dirname(__dirname)+data.image)
        //       fs.unlink(filePath, async (error) => {
        //        if (error) {
        //         res.status(400).json({ message: "Data is not deleted", error: error })
        //        }
        //       })
        await Product.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            success: true,
            data: "Success deleted"
        })
        //  }
        // })
    } catch (error) {
        res.status(500).json({ message: "Something with wrong", error: error })
    }
}




//UI statistikasi
exports.getByUserUIProduct = async (req, res) => {
    // const category  = await Category.find()
    const newsProduct = await Product.find()
        .populate(['categoryID', 'colorID'])
        .sort({ createdAt: -1 })
        .limit(12)
    const bestProduct = await Product.find()
        .populate(['categoryID', 'colorID'])
        .sort({ price: -1 })
        .limit(12)
    const chegirmaProduct = await Product.find({ chegirma: { $gt: 0 } })
        .populate(['categoryID', 'colorID'])
        .sort({ price: 1 })
        .limit(12)
    const sliders = await Slider.find()
        .sort({ createdAt: -1 })
        .limit(3)
    res.render('./client/index', {
        layout: './client',
        title: "Hamroh",
        newsProduct,
        bestProduct,
        chegirmaProduct,
        sliders,
        category
    })
    //res.json(chegirmaProduct)

}

//images uchun
exports.getByUserImagesIDProduct = async (req, res) => {
    const product = await Product.findById({ _id: req.params.id })
    res.json(product)
}

//Bitta productni olish
exports.getUserByIDProduct = async (req, res) => {
    const category = await Category.find()

    const product = await Product.findById({ _id: req.params.id })
        .populate(['categoryID', 'colorID'])
    const commentAll = await Comments.find({ productID: product._id })
        .sort({ createdAt: -1 })
        .populate(['userID', 'productID'])
    const products = await Product.find({ categoryID: product.categoryID })
        .populate(['categoryID', 'colorID'])
        .limit(4)
    const productss = await Product.find()
        .populate(['categoryID', 'colorID'])
        .skip(5)
        .sort({ createdAt: -1 })
    const user = req.session.user;
    res.render("./client/product_window", { title: "Hamroh", layout: "./client", category, product, products, productss, user, commentAll, lang: req.session.ulang })
}

//Zakaz berish
exports.getChekoutByIDProduct = async (req, res) => {
    const category = await Category.find()
    const product = await Product.findById({ _id: req.params.id })
        .populate(['categoryID', 'colorID'])
        .sort({ createdAt: -1 })
    const user = req.session.user;
    res.render("./client/checkout", { title: "Hamroh", layout: "./client", product, user, category, lang: req.session.ulang })
}


