const Flat = require("../madels/flat")


exports.forbank = async (req, res) => {
    try {
        const result = await Flat.findByIdAndUpdate(req.params.id, {$set: {status: 1} } )
        res.json({data: result})
    } catch (e) {
        console.log(e, 'er')
    }
}

exports.forstotal = async (req, res) => {
    try {
        const result = await Flat.findByIdAndUpdate(req.params.id, {$set: {status: 2} } )
        res.json({data: result})
    } catch (e) {
        console.log(e, 'er')
    }
}