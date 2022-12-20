const User = require("../../models/User");
const Slider = require("../../models/Slider");
const Product = require("../../models/Products");
const Chegirma = require("../../models/Chegirma");
const Order = require("../../models/Order");

exports.dashboard = async (req, res, next) => {
  const user = req.session.admin; // admin session
  const all_user = await User.find({ role: { $in: "user" } }).count();
  const all_slider = await Slider.find().count();
  const all_product = await Product.find().count();
  const all_chegirma = await Chegirma.find().count();
  const all_order = await Order.find().count();
  const all_order_active = await Order.find({
    status: { $in: "active" },
  }).count();
  const all_order_noactive = await Order.find({
    status: { $in: "noactive" },
  }).count();

  const all_product_summ = await Product.aggregate([
    {
      $match: {},
    },
    {
      $group: {
        _id: null,
        totalSum: { $sum: "$price"  },
      },
    },
  ]);
  const noactive_summ = await Order.aggregate([
    {
      $match: {
        status: {
          $eq: "noactive",
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSum: { $sum: { $sum: "$total_Price" } },
      },
    },
  ]);
  const active_summ = await Order.aggregate([
    {
      $match: {
        status: {
          $eq: "active",
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSum: { $sum: { $sum: "$total_Price" } },
      },
    },
  ]);

  res.render("./admin/dashboard", {
    layout: "./admin_layout",
    user,
    all_user,
    all_slider,
    all_product,
    all_chegirma,
    all_order,
    all_order_active,
    all_order_noactive,
    noactive_summ,
    active_summ,
    all_product_summ,
  });


};
exports.login = async (req, res, next) => {
  res.render("./admin/login/index", { layout: "./admin/login/layout",});
};

exports.orders_noactive = async (req, res, next) => {
  res.render("./admin/order/noactive", { layout: "./admin_layout",});
};
exports.orders_active = async (req, res, next) => {
  res.render("./admin/order/active", { layout: "./admin_layout", });
};
