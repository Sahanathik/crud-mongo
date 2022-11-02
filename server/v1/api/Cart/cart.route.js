import express from 'express';
import Controller from './cart.controller.js';
import Validation from '../../util/verifyToken.js'


const router = express.Router();

router.post('/createCart', Validation.verifyTokenAndAdmin, Controller.createCart);
router.put('/updateCart/:id', Validation.verifyTokenAndAdmin, Controller.updateCart);
router.delete('/deleteCart/:id', Validation.verifyTokenAndAdmin, Controller.deleteCart);
router.delete('/getUserCart', Validation.verifyTokenAndAdmin, Controller.getUserCart);
router.delete('/getAllUserCart', Validation.verifyTokenAndAdmin, Controller.getAllUserCart);

export default router;