const Card = require('../models/Card');
exports.createOne = async (req, res, next) => {
    try{
    const result = new Card({
        cardNomer : req.body.cardNomer 
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
    await Card.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({message : "Card successfully deleted"})
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}

exports.getItems = async (req, res, next) => {
    try{
    const result = await Card.find()
    .sort({createdAt:-1})
    res.json(result[0])
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
}

exports.updateOne = async (req, res, next) => {
    try{
    const result = await Card.findByIdAndUpdate({ _id: req.params.id })
    result.cardNomer = req.body.cardNomer
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


