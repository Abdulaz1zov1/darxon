const Product = require("../models/Products");
const Category = require("../models/Category");
exports.searchAdmin = async (req, res) => {
  let searchExpression_name = new RegExp(req.query.name);
  // const result = await Product.find().or([
  //   { ["name.uz"]: { $regex: searchExpression_name, $options: "i" } },
  //   { ["name.ru"]: { $regex: searchExpression_name, $options: "i" } },
  //   { ["description.ru"]: { $regex: searchExpression_name, $options: "i" } },
  //   { ["description.uz"]: { $regex: searchExpression_name, $options: "i" } },
  // ]);
  const result = await Product.aggregate([
    {
      $match: {
        $or: [
          { "name": { $regex: searchExpression_name, $options: "$i" } },
        ],
      }
    }
  ])






  const user = req.session.admin;
  if (!result) {
    res.render("./admin/error/404", {
      layout: "./admin_layout",
      result,
      user,
    });
  }
  res.render("./admin/search/index", {
    layout: "./admin_layout",
    result,
    user,
  });
};
exports.searchClient = async (req, res) => {
  let searchExpression_name = new RegExp(req.query.name);

  pipeline = [
    {
      $match: {
        "name.uz": { $regex: searchExpression_name, $options: "i" },
        "name.ru": { $regex: searchExpression_name, $options: "i" },
      },
    },
  ];



  const result = await Product.aggregate(pipeline);
  const category = await Category.find();
  const user = req.session.user;
  res.render("./client/search", {
    title: "Hamroh",
    layout: "./client",
    result,
    user,
    category,
  });
  console.log(result)
};
