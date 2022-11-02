import express from 'express';
import Controller from './products.controller.js';
import multer from 'multer';
import path from 'path';
import Token from '../../util/verifyToken.js'

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'v1/upload/products');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/addProducts', Token.verifyTokenAndAdmin, upload.single('image'), Controller.addProducts)
router.delete('/deleteProducts', Token.verifyTokenAndAdmin, Controller.deleteProducts)
router.put('/updateProducts', Token.verifyTokenAndAdmin, Controller.updateProducts)
router.get('/getAllProducts', Controller.getAllProducts)
router.get('/getSingleProducts', Controller.getSingleProducts)


export default router;