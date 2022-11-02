import mongoose from 'mongoose';
import crypto from 'crypto';


const orderSchema = new mongoose.Schema({
    userId:{type:String, require:true},
    products : [
        {
            productId : {
                type : String,
            },
            quantity : {
                type : Number,
                default : 1
            }
        }
    ],
    amount:{type:Number, require:true},
    address:{type:Object, require:true},
    status: { type : String, default:"pending"},

},
{
    timestamps:true
});

// productSchema.pre('save', function(next){
//     this.uuid="PRO-"+crypto.pseudoRandomBytes(6).toString('hex').toUpperCase()
//     next()
// })

export default mongoose.model('order', orderSchema)