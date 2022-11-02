import express from 'express';
import Controller from './order.controller.js';
import Token from '../../util/verifyToken.js'


const router = express.Router();

router.post('/createOrder',Token.verifyTokenAndAdmin, Controller.createOrder);
router.put('/updateOrder', Token.verifyTokenAndAdmin, Controller.updateOrder);
router.delete('/deleteOrder', Token.verifyTokenAndAdmin, Controller.deleteOrder);
router.get('/getUserOrder', Token.verifyTokenAndAdmin, Controller.getUserOrder);
router.get('/getAllUserOrder', Token.verifyTokenAndAdmin, Controller.getAllUserOrder);
router.get('/getMonthlyIncome', Token.verifyTokenAndAdmin, Controller.getMonthlyIncome);

export default router;