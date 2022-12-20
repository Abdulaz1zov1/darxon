const Products = require("../models/Products");
const Users = require("../models/User");
const Order = require("../models/Order");
const { v4: uuidv4 } = require('uuid');
exports.addOrder = async (req, res, next) => {
  try {
    let isActiv = true;
    console.log(req.body)
    const user = await Users.findById(req.body.userID)
  if(!user){
    res.status(404).json({ message: "User Not Found"})
  }else{
    let totalPrices = 0;
    for (let i = 0; i < req.body.product_ID.length; i++) {
      let product;
       product = await Products.findOne({_id:req.body.product_ID[i].productID})
      if( !product){
        isActiv =false;
      }else{
      totalPrices += product.price * req.body.product_ID[i].count
      }
    }
    if(!isActiv){
      res.status(404).json({ message: "Product Not Found"})
    }else{
      const result = new Order({
        phone: req.body.phone,
        address: req.body.address,
        coords:{
          lat : req.body.lat,
          long:req.body.long
        },
        totalPrice: totalPrices,
        order_id: uuidv4(),
        user_name: user.fullName,
        userID: req.body.userID,
        product_ID: req.body.product_ID,
        imageID : req.body.imageID
      });
      
      await result
        .save({ validateBeforeSave: false })
        .then(() => {
          res.status(201).json({ data: result });
        })
        .catch((error) => {
          res.status(400).json({ data: error });
        });
    } 
  }
  } catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
  }
};
//  order haqida malumot olish
exports.information = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    .populate(["userID", "imageID", "product_ID.productID"])
    .sort({createdAt:-1})
    res.status(200).json({ message: "Data is found", data: order });
  } catch (error) {
    res.status(400).json({ message: "Data is not found", data: error });
  }
};
// mahsulot haqida malumot olish
exports.information_product = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id)
    .populate(["userID", "imageID", "product_ID.productID"])
    .sort({createdAt:-1})
    res.status(200).json({ message: "Data is found", data: product });
  } catch (error) {
    res.status(400).json({ message: "Data is not found", data: error });
  }
};
// active buyurtmalarni olish
exports.getActiveOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ status:  { $in:"active" }})
      .populate(["userID", "imageID", "product_ID.productID"])
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "Data is found", data: order });
  } catch (error) {
    res.status(400).json({ message: "Data is not found", data: error });
  }
};

exports.getHistoryOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ userID: req.params.id})
      .populate(["userID", "imageID", "product_ID.productID"])
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "Data is found", data: order });
  } catch (error) {
    res.status(400).json({ message: "Data is not found", data: error });
  }
};
// noactive buyurtmalarni olish
exports.getNoactiveOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ status: { $in: "inactive" } })
      .populate(["userID", "imageID", "product_ID.productID"])
      .sort({ createdAt: -1 });
    // const user = req.session.admin; // admin session
    res.status(200).json({ message: "Data is found", data: order });
  } catch (error) {
    res.status(400).json({ message: "Data is not found", data: error });
  }
};
// buyurtmani activ qilish
exports.makeOrderActive = async (req, res, next) => {
  const result = await Order.findByIdAndUpdate(req.params.id);
  result.status = "active";
  result
    .save()
    .then(() => {
      res.status(200).json({ message: "Order is  actived", data: result })
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed", data: error });
    });
};


exports.searchAdmin = async (req, res,next) => {
  try {
    let searchExpression_name = new RegExp(req.query.order_id);
    let searchExpression_username = new RegExp(req.query.user_name);
    const result = await Order.aggregate([
      {
        $match: {
          $or: [
            { "order_id": { $regex: searchExpression_name, $options: "$i" } },
            { "user_name": { $regex: searchExpression_username, $options: "$i" } },
          ],
        }
      }
    ])
    // .populate(["userID", "imageID", "product_ID.productID"])
    // .sort({ createdAt: -1 });
    res.status(200).json({message : "Successfully found", result})
  } catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
  }
};

// buyurtmani noactive qilish
exports.makeOrderNoactive = async (req, res, next) => {
  const result = await Order.findByIdAndUpdate(req.params.id);
  result.status = "inactive";

  // const product = await Products.findByIdAndUpdate(result.productID);
  // product.bestSeller_count--;
  // product.save();

  result
    .save()
    .then(() => {
      res.status(200).json({ message: "Order is noactived", data: result })
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed", data: error });
    });
};
// buyurtmani korilgan qilish
exports.makeSeenOrder = async (req, res, next) => {
  const result = await Order.findByIdAndUpdate(req.params.id);
  result.process = "seen";
  result
    .save({ validationBeforeSave: false })
    .then(() => {
      res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed", data: error });
    });
};
// buyurtmani korilmagan  qilish
exports.makeUnseenOrder = async (req, res, next) => {
  const result = await Order.findByIdAndUpdate(req.params.id);
  result.process = "unseen";
  result
    .save({ validationBeforeSave: false })
    .then(() => {
      res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed", data: error });
    });
};
// buyurtmani o'chirish
exports.deleteOrder = async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json({ message: "Success", data: [] });
    }
  });
};
// User paneldan orderni ochirish
exports.deleteOrders = async (req, res, next) => {
  try{
    await Order.findByIdAndDelete( req.params.id );
    res.status(200).json({message : "Order successfully deleted"})
} catch (error) {
    res.status(500).json({message : "Something with wrong", error : error})
}
};