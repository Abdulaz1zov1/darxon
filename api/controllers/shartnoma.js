const Shartnoma = require('../madels/shartnoma');


const getAllCategory = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const condition = {flat: req.query.flat}
        !condition.flat&&delete condition.flat;
        const data = await Shartnoma.find(condition)
        .populate(["flat"])
        .limit(limit *1)
        .skip((page-1)*limit);
        const count =  await Shartnoma.count()
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



const getByIdCategory = async (req, res) => {
    try {
        const result = await Shartnoma.findById({ _id: req.params.id })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(404).send("malumot topilmdi xatolik")
    }
}


const create = async (req, res)=> {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`http://localhost:5030/${photo.path.slice(7)}`))
    try {
        const category = new Shartnoma({ ...req.body, photo: photos })
        await category.save()
        res.status(201).send(category)
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }
}



const getQuery = async (req, res) => {
    try {
        let condition = {};
        const {
            number,
            inn,
            passport_seriya,
            investor_passport_seriya,
            passport_region,
            passport_date,
            investor_name,
            investor_lastname,
            investor_otasini_ismi,
            uy_address,
        } = req.query
        if (number) condition = { ...condition, number }
        if (passport_seriya) condition = { ...condition, passport_seriya }
        if (inn) condition = { ...condition, inn }
        if (investor_passport_seriya) condition = { ...condition, investor_passport_seriya }
        if (passport_region) condition = { ...condition, passport_region }
        if (passport_date) condition = { ...condition, passport_date }
        if (investor_name) condition = { ...condition, investor_name }
        if (investor_lastname) condition = { ...condition, investor_lastname }
        if (investor_otasini_ismi) condition = { ...condition, investor_otasini_ismi }
        if (uy_address) condition = { ...condition, uy_address }
        const data = await Shartnoma.find(condition)
        return res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}



const updet = async (req, res) => {
    try {
        const rasmla = req.files
        let photos = []
        rasmla.forEach(photo =>
            photos.push(`http://localhost:5030/${photo.path.slice(7)}`)
        )
        let shartnoma = await Shartnoma.findByIdAndUpdate(req.params.id, {
            ...req.body, photo: photos
        })
        res.status(201).send({message: "update", data: shartnoma })
    } catch(error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }

}


const del = async (req, res) => {
    try {
        if(req.params.id) {
            const _id = req.params.id
            let category = await Shartnoma.findByIdAndDelete({_id})
            res.status(201).send({message: "O'chirildi", data: category })
        }
    } catch(error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }

}

module.exports = { create, getAllCategory, del, updet,getQuery, getByIdCategory }