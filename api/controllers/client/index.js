const FAQ = require('../../models/FAQ')
const Slider = require('../../models/Slider')
const Product = require('../../models/Products')
const Category = require('../../models/Category')
const Banner = require('../../models/Banner')

exports.index = async (req, res, next) => {
  const user = req.session.user; // user session
  // YANGI MAHSULOTLAR BOLIMI
  const NEW_PRODUCT = await Product.find()
    .populate(['categoryID', 'colorID'])
    .sort({ date: -1 })
    .limit(12)

  const SLIDER = await Slider.find()
   


  // CHEGIRMA VA AKSIYALAR BOLINI
  const OFF_PRODUCT = await Product.find({ chegirma: { $gt: 0 } })
    .populate(['categoryID', 'colorID'])
    .sort({ price: 1 })
    .limit(12)


  // TAVSIYA QILINAYOTGAN MAHSULOTLAR BOLIMI
  const RECOMMENDED_PRODUCT = await Product.find()
    .populate(['categoryID', 'colorID'])
    .sort({ price: -1 })
    .limit(12)



  // MAISHIY MAHSULOTLAR BOLIMI
  const MAISHIY = await Product.find()
    .populate(['categoryID', 'colorID'])
    .sort({ price: -1 })
    .skip(5)
    .limit(12)



 

  res.render("./client/index", {
    title: "Hamroh", layout: "./client",
    user,NEW_PRODUCT,OFF_PRODUCT,RECOMMENDED_PRODUCT,MAISHIY,SLIDER,
    lang: req.session.ulang
  });

};
exports.about = async (req, res, next) => {
  const result = await FAQ.find()
  const user = req.session.user; // user session
  res.render("./client/about", { title: "Hamroh", layout: "./client", user, result,  lang: req.session.ulang });
};
exports.contact = async (req, res, next) => {
  const user = req.session.user; // user session
  res.render("./client/contact", { title: "Hamroh", layout: "./client", user,  lang: req.session.ulang });
};
exports.profil = async (req, res, next) => {
  const user = req.session.user; // user session
  res.render("./client/profil", { title: "Hamroh", layout: "./client", user,  lang: req.session.ulang });
};
exports.delivery = async (req, res, next) => {
  const user = req.session.user;
  res.render("./client/delivery", { title: "Hamroh", layout: "./client", user,  lang: req.session.ulang });
}
exports.location = async (req, res, next) => { 
  const user = req.session.user;
  res.render("./client/location", { title: "Hamroh", layout: "./client", user, lang: req.session.ulang });
} 
exports.basket = async (req, res, next) => { 
  const user = req.session.user;
  res.render("./client/buy_product", { title: "Hamroh", layout: "./client", user, lang: req.session.ulang });
} 

// bitta kategoriyani id si boyicha mahsulotlarni olish
exports.filter_category = async (req, res, next) => {
  const product = await Product.find({ categoryID: req.params.id })
  const user = req.session.user;
  res.render("./client/category", { title: "Hamroh", layout: "./client", user, product, lang: req.session.ulang });
}

// bitta maxsulot boyicha olib berish
exports.get_one_product = async (req, res, next) => {
  const user = req.session.user;
  const product = await Product.findById(req.params.id)
  res.render("./client/product", { title: "Hamroh", layout: "./client", user, product, lang: req.session.ulang });
}