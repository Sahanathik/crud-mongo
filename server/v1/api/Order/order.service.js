import orderSchema from './order.model.js'

async function createOrder(req,res,next){
    try {
        let OrderDetails = new orderSchema(req);
        OrderDetails.save()

        console.log(OrderDetails)
        res.status(200).json(OrderDetails)
    } catch (error) {
       console.log(error) 
    }
}

async function updateOrder(req,res,next){
    try {
        console.log("req", req)
        if(req.email){
          let updateData = await orderSchema.findByIdAndUpdate({_id : req.params.id}, req.data , {new : true} ).exec();
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

async function deleteOrder(req,res,next){
    try {
        let deleteData = await orderSchema.findByIdAndDelete(req.id).exec();
        res.status(200).json("Cart has been deleted...", deleteData)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getUserOrder(req,res,next){
    try {
        let userCartData = await orderSchema.findOne({userId : req.userId}).exec();
        res.status(200).json(userCartData)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getAllUserOrder (req,res,next){
    try {
        let userCart = await orderSchema.find();
        res.status(200).json(userCart)
    } catch (error) {
        res.status(500).json(error)
    }
}

async function getMonthlyIncome (req, res, next){
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try {
        const income = await orderSchema.aggregate([
            {
                $match: {
                    createdAt : {
                        $gte : previousMonth
                    }
                },

                $project : {
                    month : {
                        $month : "$createdAt"
                    },
                    sales : "$amount",
                }
            },
            {
                $group : {
                    _id : "$month",
                    total : {
                    $sum : "$sales"
                    }
                }
            }
        ])

        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
}


export default {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllUserOrder,
    getMonthlyIncome
}