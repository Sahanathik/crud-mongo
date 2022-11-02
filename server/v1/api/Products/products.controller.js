import Service from './products.service.js'

async function addProducts(req,res,next){ 
    // console.log(req.file)
    await Service.addProducts(req, res, function(result){
        return res.json({message : result.message, result:result})
    })
}


async function deleteProducts(req,res,next){ 
    await Service.deleteProducts(req.body, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function updateProducts(req,res,next){ 
    await Service.updateProducts(req.body, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function getAllProducts(req,res,next){ 
    await Service.getAllProducts(req.query, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function getSingleProducts(req,res,next){ 
    await Service.getSingleProducts(req.body, res, function(result){
        return res.json({message : result.message, result:result})
    })
}





export default {
    addProducts,
    deleteProducts,
    updateProducts,
    getAllProducts,
    getSingleProducts,
    
}