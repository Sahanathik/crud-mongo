import express from 'express';
import Controller from './user.controller.js';
import Token from '../../util/verifyToken.js';

const app = express()

let router = express.Router()

router.post('/register', Controller.register)
router.get('/verifyEmail', Controller.verifyEmail)
router.post('/login', Controller.login)
router.post('/forgotPassword', Controller.forgotPassword)
router.get('/getallUser', Token.verifyToken, Controller.getallUser)
router.post('/updateUser', Token.verifyToken, Controller.updateUser)
router.post('/sendEmailAWS', Controller.sendEmailAWS)

// router.get('/register', function(req, res){
//     Controller.register
//     console.log("router")
// })

// router.get('/verifyEmail', function(req, res){
//     Controller.verifyEmail
// })

export default router