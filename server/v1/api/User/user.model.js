import mongoose from 'mongoose';
import crypto from 'crypto';


const userSchema = new mongoose.Schema({
    uuid:{type:String, require:true, unique:true},
    name:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    phoneNumber:{type:String, maxlength:10, require:true},
    loginStatus:{type:String, require:false},
    // role:{type:String, enaum : ['admin','user'], default:'user', require:false},
    isAdmin:{type:Boolean, default:true},
    active : {type:Boolean, default:false},
    loginStatus : {type:Boolean, default:false},
    token:{type:String}
},
{
    timestamps:true
});

userSchema.pre('save', function(next){
    this.uuid="USR-"+crypto.pseudoRandomBytes(6).toString('hex').toUpperCase()
    next()
})

export default mongoose.model('user', userSchema)