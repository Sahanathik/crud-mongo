import Service from './cart.service.js'

async function createCart(req,res,next){ 
    // console.log(req.file)
    await Service.createCart(req.body, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function updateCart(req,res,next){ 
    // console.log(req.file)
    await Service.createCart(req.params, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function deleteCart(req,res,next){ 
    // console.log(req.file)
    await Service.createCart(req.params, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function getUserCart(req,res,next){ 
    // console.log(req.file)
    await Service.createCart(req.params, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function getAllUserCart(req,res,next){ 
    // console.log(req.file)
    await Service.createCart(req.params, res, function(result){
        return res.json({message : result.message, result:result})
    })
}



export default {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllUserCart
    
}