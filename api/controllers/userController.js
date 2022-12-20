const User = require("../models/User");
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const sendEmail = require('../utils/sendEmail');
exports.register = async (req, res, next) => {
    try{
    const user = new User({
        fullName: req.body.fullName,
        password: req.body.password,
        phone: req.body.phone,
        email : req.body.email,
        role : req.body.role
    });
    await user.save()
        .then(async () => {
            res.status(201).json({
                success: true,
                data: user
            });
        })
        .catch((error) => {
            res.status(400).json({
                success: false,
                data: error,
            });
        });
    } catch (error) {
        res.status(500).json({message : "Something with wrong", error : error})
    }
};
exports.login = async (req, res, next) => {
    try{
    const { email, password, phone } = req.body;
    if(phone){
        if (!phone || !password) {
            res.status(400).json({ success: false, data: 'Please provide phone and password' })
      }
      const user = await User.findOne({ phone: phone }).select(['+password']);
      if (!user) {
            res.status(401).json({ success: false, data: 'Unauthorized' })
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
            res.status(401).json({ success: false, data: 'Invalid credentials' })
      }
      sendTokenResponse(user, 200, res);
    }else{
        if (!email || !password) {
            res.status(400).json({ success: false, data: 'Please provide email and password' })
      }
      const user = await User.findOne({ email: email }).select(['+password']);
      if (!user) {
            res.status(401).json({ success: false, data: 'Unauthorized' })
      }
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
            res.status(401).json({ success: false, data: 'Invalid credentials' })
      }
      sendTokenResponse(user, 200, res);
    }
   
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}
exports.getMe = async (req, res, next) => {
    try{
    const token = req.headers.authorization
    const my = JWT.decode(token)
    const user = await User.findById({ _id: my.id })
    res.status(201).json({ success: true, data: user });
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}
exports.editAuth = async (req, res, next) => {
    try{
    const user = await User.findByIdAndUpdate({ _id: req.params.id });
    if (!user) {
        res.status(404).json({ success: false, data: "Auth Not Found" });
    }
    user.fullName = req.body.fullName;
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.password = req.body.password;
    await user
        .save()
        .then(() => {
            res.status(200).json({ success: true, data: user });
        })
        .catch((error) => {
            res.status(400).json({ success: false, error: error });
        });
    } catch (error) {
        res.status(500).json({message : "Something with wrong", error : error})
    }
};
exports.deleteAuth = async (req, res, next) => {
    try{
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ success: true, data: [] });
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
};



exports.getUserAll = async (req, res, next) => {
    try{
    const user = await User.find({ role: "user" }).sort({ date: -1 });
    res.status(200).json({ success: true, data: user });
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
};
// exports.getAdminAll = async (req, res, next) => {
//     const user = await User.find({ role: 2 }).sort({ date: -1 });
//     res.status(200).json({ success: true, data: user });
// };
// exports.getLockedUserAll = async (req, res, next) => {
//     const user = await User.find({ role: 3, isActive: false }).sort({ date: -1 });
//     res.status(200).json({ success: true, data: user });
// };

// Seen token
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJWT();
    const options = {
          expires: new Date(Date.now() + config.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
          httpOnly: true
    };
    res.status(statusCode)
          .cookie('token', token, options)
          .json({ success: true, token });
}

// POST - /auth/forgotpassword
exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) { res.status(404).json({ success: false, data: 'User not found' }) }
    const resetToken = user.getResetPasswordToken();
    console.log(`This is ResetToken: ${resetToken}`)

    await user.save({ validateBeforeSave: false })
    const resetUrl = `${req.protocol}://LCP/resetpassword/${resetToken}`;

    const msg = {
          to: req.body.email,
          subject: 'Parolni tiklash manzili',
          html: `Parolini tiklash uchun ushbu tugmani bosing  <a type="button" href="${resetUrl}" 
          style="cursor: pointer;background-color: #eee ">Tugma</a>`
    };
    try {
          await sendEmail(msg)
          res.status(200).json({ success: true, data: 'Email is sent' });
    } catch (err) {
          console.log(err)
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;

          await user.save({ validateBeforeSave: false })
          res.status(500).json({ success: false, data: 'Email could not be sent' });
    }
}
// PUT - /auth/forgotpassword
exports.resetPassword = async (req, res, next) => {
    const salt = await bcrypt.genSaltSync(12);
    const newHashedPassword = await bcrypt.hashSync(req.body.password, salt);
    const user = await User.findOneAndUpdate({
          resetPasswordToken: req.params.resettoken
    });
    if (!user) {
          return next(new ErrorResponse('Invalid Token', 400));
    }
    // New password is set and it will be hashed after that
    user.password = newHashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    // console.log(user.password);
    await user.save();
    sendTokenResponse(user, 200, res);
}