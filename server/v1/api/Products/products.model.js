import mongoose from 'mongoose';
import crypto from 'crypto';


const productSchema = new mongoose.Schema({
    uuid:{type:String, require:true, unique:true},
    title:{type:String, require:true, unique:true},
    desc:{type:String, require:true},
    image:{type:String, require:true},
    categories:{type:Array},
    color : {type:String},
    size : {type : String},
    price:{type:Number, require:true}
},
{
    timestamps:true
});

productSchema.pre('save', function(next){
    this.uuid="PRO-"+crypto.pseudoRandomBytes(6).toString('hex').toUpperCase()
    next()
})

export default mongoose.model('product', productSchema)