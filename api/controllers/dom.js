const Dom = require('../madels/dom');


const getAllCategory = async (req, res) => {
    try {
        let category = await Dom.find().populate(["category"])
        res.status(201).send(category)
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }
}



const getByIdCategory = async (req, res) => {
    try {
        const result = await Dom.findById({ _id: req.params.id })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(404).send("malumot topilmdi xatolik")
    }
}

const create =  async (req, res)=> {
    try {
        const category = new Dom({ ...req.body})
        await category.save()
        res.status(201).send(category)
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }
}


const updet = async (req, res) => {
    try {
        let Dom = await Dom.findByIdAndUpdate(req.params.id, {
            ...req.body
        })
        res.status(201).send({message: "update", data: Dom })
    } catch(error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }

}


const del = async (req, res) => {
    try {
        if(req.params.id) {
            const _id = req.params.id
            let category = await Object.findByIdAndDelete({_id})
            res.status(201).send({message: "O'chirildi", data: category })
        }
    } catch(error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }

}

module.exports = { create, getAllCategory, del, updet, getByIdCategory }