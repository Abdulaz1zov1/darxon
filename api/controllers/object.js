const Object = require('../madels/object');


const getAllCategory = async (req, res) => {
    try {
        let category = await Object.find().lean()
        res.status(201).send(category)
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }
}



const getByIdCategory = async (req, res) => {
    try {
        const result = await Object.findById({ _id: req.params.id })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(404).send("malumot topilmdi xatolik")
    }
}


const create =  async (req, res)=> {
    const rasmla = req.files
    let photos = []
    rasmla.forEach(photo => photos.push(`http://localhost:5030/${photo.path.slice(7)}`))
    try {
        const category = new Object({ ...req.body, photo: photos})
        await category.save()
        res.status(201).send(category)
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }
}


const updet = async (req, res) => {
    try {
        const rasmla = req.files
        let photos = []
        rasmla.forEach(photo =>
            photos.push(`http://localhost:5030/${photo.path.slice(7)}`)
        )
        let object = await Object.findByIdAndUpdate(req.params.id, {
            ...req.body, photo: photos
        })
        res.status(201).send({message: "update", data: object })
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