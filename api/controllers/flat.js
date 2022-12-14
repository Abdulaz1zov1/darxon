const Flat = require('../madels/flat');
const Dom = require('../madels/dom');
const crypto = require("crypto");
var a = 1;
const id = crypto.randomBytes(16).toString("hex");

const getAllFlat = async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        const condition = {category: req.query.category}
        !condition.category&&delete condition.category;
        const data = await Flat.find(condition)
        .populate(["dom"])
        .limit(limit *1)
        .skip((page-1)*limit);
        const count =  await Flat.count()
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
        const result = await Flat.findById({ _id: req.params.id })
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
        let { dom, xona_soni,umumiy_kv,prixoshka,zal,xojatxona_1,xojatxona_2,vanna_1,vanna_2,spalniy,detskiy,kuxniya, status} = req.body
        status = status || 0
        await Dom.findOne({dom}).lean().then(res=>{
            for(i=0; i<=res.soni; i++){
                a++;
                res.id = id+a
                let num = i;
                const flat = new Flat({ dom,id, xona_soni, umumiy_kv,prixoshka,zal,xojatxona_1,xojatxona_2,vanna_1, spalniy, vanna_2,detskiy,kuxniya, num, status, createdAt:Date.now(), photo: photos })
                flat.save()
            }
            console.log(res.soni, 'hey');
        })
        
        
        res.status(201).send({message: "Muvaffaqiyatli saqlandi"})
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }
}


const getQuery = async (req, res) => {
    try {
        let condition = {};
        const {
            xona_soni,
            umumiy_kv,
            prixoshka,
            zal,
            xojatxona_1,
            xojatxona_2,
            vanna_1,
            vanna_2,
            spalniy,
            detskiy,
            kuxniya
        } = req.query
        if (xona_soni) condition = { ...condition, xona_soni }
        if (umumiy_kv) condition = { ...condition, umumiy_kv }
        if (prixoshka) condition = { ...condition, prixoshka }
        if (zal) condition = { ...condition, zal }
        if (xojatxona_1) condition = { ...condition, xojatxona_1 }
        if (xojatxona_2) condition = { ...condition, xojatxona_2 }
        if (vanna_1) condition = { ...condition, vanna_1 }
        if (vanna_2) condition = { ...condition, vanna_2 }
        if (spalniy) condition = { ...condition, spalniy }
        if (detskiy) condition = { ...condition, detskiy }
        if (kuxniya) condition = { ...condition, kuxniya }

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




const updet = async (req, res) => {
    try {
        const rasmla = req.files
        let photos = []
        rasmla.forEach(photo =>
            photos.push(`http://localhost:5030/${photo.path.slice(7)}`)
        )
        let flat = await Flat.findByIdAndUpdate(req.params.id, {
            ...req.body, photo: photos
        })
        res.status(201).send({message: "update", data: flat })
    } catch(error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }

}


const del = async (req, res) => {
    try {
        if(req.params.id) {
            const _id = req.params.id
            let flat = await Flat.findByIdAndDelete({_id})
            res.status(201).send({message: "O'chirildi", data: flat })
        }
    } catch(error) {
        console.log(error);
        res.status(500).send("Serverda xatolik")
    }

}

module.exports = { create, getAllFlat, del, updet, getQuery, getByIdCategory }