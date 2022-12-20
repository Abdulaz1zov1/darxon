const Band = require('../models/Band');
exports.createOne = async (req, res, next) => {
    try{
    const result = new Band({
        phone: req.body.phone,
        userID: req.body.userID,
        user_count : req.body.user_count,
        arrival_time : req.body.arrival_time
    })
    result.save()
        .then(() => {
            res.status(201).json({ message: "Data is  created", data: result })
        })
        .catch((error) => {
            res.status(400).json({ message: "Data is not created", data: error })
        })
    } catch (error) {
        res.status(500).json({message : "Something with wrong", error : error})
    }

}
exports.deleteOne = async (req, res, next) => {
    try{
    await Band.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({message : "Band successfully deleted"})
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}
exports.Band_of_users = async (req, res, next) => {
    try{
    const result = await Band.find({ userID: req.params.id }).populate(["userID"])
    res.json(result)
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}

exports.getItems = async (req, res, next) => {
    try{
    const result = await Band.find({ _id: req.params.id }).populate(["userID"])
    res.json(result)
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}

exports.getAll = async (req, res, next) => {
    try{
    const result = await Band.find().populate(["userID"])
    .sort({createdAt:-1})
    res.json(result)
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}
