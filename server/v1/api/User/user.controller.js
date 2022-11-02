import Service from './user.service.js';
import userSchemaValidation from './user.validation.js'

async function register(req,res,next){
  
    console.log("Controller")
    await Service.register(req.body, res, function(result){
        return res.json({message : result.message, result:result})
    })


}

async function verifyEmail(req,res,next){
    await Service.verifyEmail(req.query, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function login(req,res,next){
    await Service.login(req.body, res, function(result){
        return res.json({message : result.message, result:result })
    })
}

async function forgotPassword(req,res,next){
    await Service.forgotPassword(req.body, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function getallUser(req,res,next){
    await Service.getallUser(req, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function updateUser(req,res,next){
    await Service.updateUser(req.body, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

async function sendEmailAWS(req,res,next){ 
    await Service.sendEmailAWS(req.body, res, function(result){
        return res.json({message : result.message, result:result})
    })
}

export default {
    register,
    verifyEmail,
    login,
    forgotPassword,
    getallUser,
    updateUser,
    sendEmailAWS

}
