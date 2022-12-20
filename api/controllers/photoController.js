const Photo = require('../models/Image')
const JWT = require('jsonwebtoken');
const config = require('../config/config')
exports.addPhoto = async (req, res, next) => {
  try {
    let token;
    token = req.headers.authorization;
    const decoded = JWT.verify(token, config.JWT_SECRET);
    const result = new Photo({
      image: `/public/uploads/${req.file.filename}`,
      userID: decoded.id
    })
    await result
      .save({ validateBeforeSave: false })
      .then(() => {
        res.status(201).json({ data: result });
      })
      .catch((error) => {
        res.status(400).json({ data: error });
      });
  } catch (error) {
    res.status(500).json({ message: "Something with wrong", error: error.message })
  }
};

exports.photo_of_users = async (req, res, next) => {
  try{
  const result = await Photo.find({ userID: req.params.userID }).populate(["userID"])
  .sort({ createdAt: -1 })
  .limit(1)
  res.json(result)
} catch (error) {
  res.status(500).json({message : "Something with wrong", error : error})
}
}
