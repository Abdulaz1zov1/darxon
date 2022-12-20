const Basket = require('../models/Basket');
exports.createOne = async (req, res, next) => {
    try{
    const result = new Basket({
        productID: req.body.productID,
        userID: req.body.userID,
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
    await Basket.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({message : "Basket successfully deleted"})
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}
exports.basket_of_users = async (req, res, next) => {
    try{
    const result = await Basket.find({ userID: req.params.id }).populate(["productID"])
    res.json(result)
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}

exports.getItems = async (req, res, next) => {
    try{
    const result = await Basket.find({ _id: req.params.id }).populate(["productID"])
    res.json(result)
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}

