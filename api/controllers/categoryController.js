const Category = require('../models/Category')
exports.addCategory = async(req, res) => {
    try {
        const category = new Category({
            name: req.body.name
        });
        await category.save()
            .then(() => {
                res.status(201).json({message : "Category successfully created", data : category})
            })
            .catch((error) => {
                res.status(400).json({ message: "Data is not created", data: error })
            })
    } catch (error) {
        res.status(500).json({message : "Something with wrong", error : error})
    }
}


exports.getCategoryAll = async(req, res) => {
    try {
        const category = await Category.find()
        res.status(200).json({message : "Get All category successfully", data : category})
    } catch (error) {
        res.status(500).json({message : "Something with wrong", error : error})
    }
}

exports.getById = async(req, res) => {
    try {
    const category = await Category.findById(req.params.id)
    res.status(200).json({message : "Get one category successfully", data : category})
    } catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
    }
}


exports.updateCategory = async(req, res) => {
   try {
    const category = await Category.findByIdAndUpdate(req.params.id)
    category.name = req.body.name
    category.save({ validateBeforeSave: false })
        .then(() => {
            res.status(201).json({message : "Category successfully updated", data : category})
        })
        .catch((err) => {
            res.status(400).json({ message: "Data is not updated", data: err })
        })
   } catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
   }
}

exports.deleteCategory = async(req, res) => {
    try {
        await Category.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({message : "Category successfully deleted"})
    } catch (error) {
        res.status(500).json({message : "Something with wrong", error : error})
    }
}