const Chegirma = require("../models/Chegirma");
const Product = require('../models/Products')
const ObjectId = require("mongodb").ObjectID;
// Chegirma yaratish
exports.create = async (req, res, next) => {
 
  const result = new Chegirma({
    product_ID: req.body.product_ID,
    amount: req.body.amount,
  });
  const product = await Product.findByIdAndUpdate(result.product_ID);
  product.prev_payment = product.price 
  product.chegirma = result.amount
  product.price = result.amount
  product.save();

  await result
    .save()
    .then(() => {
      res.redirect('/api/chegirma/all')
    })
    .catch((err) => {
      res.status(400).json({ data: err });
    });
};


exports.getAll = async (req, res, next) => {
  const result = await Chegirma.find()
    .populate({
      path: "product_ID",
      select: ["prev_payment", "price", "name"],
    })
    .sort({ date: -1 });
  const user = req.session.admin;
  const product = await Product.find()
  res.render("./admin/chegirma/index", {
    layout: "./admin_layout",
    user, 
    result,product
  });
};



exports.deleteOne = async (req, res, next) => {
  const result = await Chegirma.findById(req.params.id)
  .populate({
    path: "product_ID",
    select: ["prev_payment", "price", "title"],
  });
  const course = await Product.findByIdAndUpdate(result.product_ID._id);
  course.price = course.prev_payment 
  course.prev_payment = 0
  course.chegirma = 0
  course.save()

  await Chegirma.findByIdAndDelete({ _id: req.params.id })
  res.redirect('/api/chegirma/all')
};