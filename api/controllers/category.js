const Category = require('../madels/category');


const getAllCategory = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const condition = {object: req.query.object}
        !condition.object&&delete condition.object;
        const data = await Category.find(condition)
        .populate(["object"])
        .limit(limit *1)
        .skip((page-1)*limit);
        const count =  await Category.count()
        res.status(200).json({pagination:{
            totol: Math.round(count/limit),
            page:+page,
            limit:+limit
        }, data})
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }
}

const getQuery = async (req, res) => {
    try {
        let condition = {};
        const {
            name,
            padez_soni,
            qavat_soni,
            bir_padez_xona,
            soni
        } = req.query
        if (name) condition = { ...condition, name }
        if (padez_soni) condition = { ...condition, padez_soni }
        if (qavat_soni) condition = { ...condition, qavat_soni }
        if (bir_padez_xona) condition = { ...condition, bir_padez_xona }
        if (soni) condition = { ...condition, soni }
        const data = await Category.find(condition)
        return res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}



const create = async (req, res)=> {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`http://localhost:5030/${photo.path.slice(7)}`))
    try {
        const category = new Category({...req.body, photo: photos})
        await category.save()
        res.status(201).send(category)
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }
}

const del = async (req, res) => {
    try {
        if(req.params.id) {
            const _id = req.params.id
            let category = await Category.findByIdAndDelete({_id})
            res.status(201).send({message: "O'chirildi", data: category })
        }
    } catch(error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }

}


const updet = async (req, res) => {
    try {
        let category = await Category.findByIdAndUpdate(req.params.id, {
            ...req.body, photo: photos
        })
        res.status(201).send({message: "update", data: category })
    } catch(error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }

}

module.exports = { create, getAllCategory, del, updet, getQuery }