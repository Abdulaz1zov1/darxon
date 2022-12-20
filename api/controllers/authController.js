const User = require("../models/User");
 
exports.super_admin = async (req, res, next) => {
  

  const result = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  await result
    .save()
    .then(() => {
      res.status(201).json({ success: "Success", data: result });
    })
    .catch((error) => {
      res.status(400).json({ success: "Failed", data: error });
    });
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.redirect("/admin/login");
  }
  const users = await User.findOne({ email: email }).select("password");
  if (!users) {
    res.redirect("/admin/login");
  }
  const isMatch = await users.matchPassword(password);
  if (!isMatch) {
    res.redirect("/admin/login");
  }
  const body = await User.findOne({ email: req.body.email });
  if (!isMatch && !users) {
    res.redirect("/admin/login");
  } else {
    req.session.admin = body;
    req.session.save();
    req.session.isAuth = true;
    res.redirect("/admin/dashboard");
  }
};
exports.logout = async (req, res, next) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/admin/login");
};
exports.getOne = async (req, res) => {
  const result = await User.findById(req.params.id)
  const user = req.session.admin; 
  res.render("./admin/profile/index", { layout: "./admin_layout",result, user });
}

exports.updateOne = async (req, res, next) => {
  const result = await User.findByIdAndUpdate(req.params.id)  
  result.fullName = req.body.fullName
  result.email = req.body.email
  result.password = req.body.password
  req.session.admin = result;
  req.session.save();
   result
    .save()
    .then(() => {
      res.redirect("/admin/dashboard");
    })
    .catch((err) => {
      res.json(err);
    });
}


