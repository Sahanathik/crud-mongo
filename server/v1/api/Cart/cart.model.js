import mongoose from 'mongoose';
import crypto from 'crypto';


const cartSchema = new mongoose.Schema({
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
    ]
},
{
    timestamps:true
});

// productSchema.pre('save', function(next){
//     this.uuid="PRO-"+crypto.pseudoRandomBytes(6).toString('hex').toUpperCase()
//     next()
// })

export default mongoose.model('cart', cartSchema)