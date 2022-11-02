import Service from './order.service.js'

async function createOrder(req,res,next){ 
    // console.log(req.file)
    await Service.createOrder(req.body, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function updateOrder(req,res,next){ 
    // console.log(req.file)
    await Service.updateOrder(req, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function deleteOrder(req,res,next){ 
    // console.log(req.file)
    await Service.deleteOrder(req, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function getUserOrder(req,res,next){ 
    // console.log(req.file)
    await Service.getUserOrder(req, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function getAllUserOrder(req,res,next){ 
    // console.log(req.file)
    await Service.getAllUserOrder(req, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function getMonthlyIncome(req,res,next){ 
    // console.log(req.file)
    await Service.getMonthlyIncome(req, res, function(result){
        return res.json({message : result.message, result:result})
    })
}


export default {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder, 
    getAllUserOrder,
    getMonthlyIncome

}