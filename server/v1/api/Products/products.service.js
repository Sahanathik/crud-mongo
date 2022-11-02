import productSchema from './products.model.js'

async function addProducts(req,res,next){
    console.log(req.file.filename)
try {

    let data = await productSchema.findOne({title : req.body.title}).exec();
    if(data){
        return res.json({status: false, message: 'product already exists pls increase the quantity'})
    }
    let productDetails = new productSchema(req.body);
    productDetails.image = req.file.filename;
    let result = await productDetails.save();
    if(result){
        return res.json({status: true, message: 'product Details added successfully', data : result})
    } else {
        return res.json({status: false, message: 'Products are not added'})
    }
    
} catch (error) {
    console.log(error)
}
    
}


async function deleteProducts(req,res,next){
    try {
        let data = await productSchema.findOne({uuid : req.uuid}).exec();
        if(!data){
            return res.json({status: false, message: 'product details are not exists'})
        } else {
            let deleteData = await productSchema.findOneAndDelete({uuid : req.uuid})
            if(deleteData){
                return res.json({status: true, message: 'product details are deleted', data : deleteData })
            } else {
                return res.json({status: false, message: 'product details are not deleted'})
            }
        }
    } catch (error) {
        console.log(error) 
    }

    
}


async function updateProducts(req, res){
    try {
        let updateDate = await productSchema.findOneAndUpdate({uuid : req.uuid}, req.data, {new : true}).exec();
        if(updateDate){
            return res.json({status: true, message: 'product details are updated', data : updateDate})
        }
    } catch (error) {
        console.log(error)
    }
}


async function getAllProducts(req, res){

    try {
        let products
        if(req.new){
            products = await productSchema.find().sort({createdAt: -1}).limit(1);
        } else if(req.category){
            console.log("category", req.category)
            products = await productSchema.find({
                categories :{
                    $in: [req.category],
                },
                
            });
            console.log("products", products)
        } else {
            products = await productSchema.find()
        }
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }

    // try {
    //     let getData = await productSchema.find().exec();
    //     if(getData){
    //         return res.json({status: true, message: 'product details are fetched', data : getData})
    //     }
    // } catch (error) {
    //    console.log(error) 
    // }
}


async function getSingleProducts(req, res){
    try {
        let data = await productSchema.findOne({ uuid : req.uuid }).exec();
        if(data) {
            return res.json({status: true, message: 'product details are fetched', data : data})
        }
    } catch (error) {
        console.log(data)
    }
}


export default {
    addProducts,
    deleteProducts,
    updateProducts,
    getAllProducts,
    getSingleProducts,
  
}