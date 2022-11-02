import cartSchema from './cart.model.js';

async function createCart(req,res,next){
    try {
        let cartDetails = new cartSchema;
        cartDetails.save()
        res.status(200).json(cartDetails)
    } catch (error) {
       console.log(error) 
    }
}

async function updateCart(req,res,next){
    try {
        console.log("req", req)
        if(req.email){
          let updateData = await cartSchema.findByIdAndUpdate({_id : req.params.id}, req.data , {new : true} ).exec();
          if(updateData){
            return res.status(200).json({status: true, message: "cart data updated successfully", data:updateData})
          } else {
            return res.status(200).json({status: false, message: "cart Details are not update", data:updateData})
          }
        }
      } catch (error) {
        console.log(error)
      }
}

async function deleteCart(req,res,next){
    try {
        let deleteData = await cartSchema.findByIdAndDelete(req.id).exec();
        res.status(200).json("Cart has been deleted...", deleteData)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getUserCart(req,res,next){
    try {
        let userCartData = await cartSchema.findOne({userId : req.userId}).exec();
        res.status(200).json(userCartData)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getAllUserCart(req,res,next){
    try {
        let userCart = await cartSchema.find();
        res.status(200).json(userCart)
    } catch (error) {
        res.status(500).json(error)
    }
}



export default {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllUserCart
}