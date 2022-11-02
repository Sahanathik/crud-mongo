import userSchema from './user.model.js'
import bcrypt from 'bcrypt';
import userSchemaValidation from './user.validation.js';
import sendEmail from '../../util/email.js';
import sendSms from '../../util/otp.js';
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import CryptoJS from 'crypto-js';
import sendAWSEmail from '../../util/sesemail.js'


async function register(req,res,next){

  try {

    console.log("req", req)

    let validateDate = await userSchemaValidation.validateAsync(req)

    console.log("validateDate")

    let emailDetails = await userSchema.findOne({email : req.email}).exec();

    if(emailDetails){
      return res.json({status: false, message: 'Email alresdy exists pls login'})
    } 

    let userdetail = new userSchema(req)
    let password=req.password;
    // let salt = await bcrypt.genSalt(10);
    // userdetail.password = bcrypt.hashSync(password, salt);

    //latest npm CryptoJS
    userdetail.password = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
    let result = await userdetail.save(); 

    //Send email verification link to mail
     const html = `<h1>Email Confirmation</h1>
     <h2>Hello ${req.name}</h2>
     <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
     <a href=http://localhost:8080/v1/api/user/verifyEmail?email=${req.email}> Click here</a>
     </div>`

     await sendEmail(req.email, "Verify Email", html);

     //Send sms with otp
     await sendSms(req.phoneNumber)

    return res.status(200).json({status: true, message: "user details are added successfully", data: result});
    
  } catch (error) {
    console.log(error)
  }
}


async function verifyEmail(req,res,next){
  try {

    let email = await userSchema.findOne({email : req.email })

    if(email){
      let status = await userSchema.findOneAndUpdate({email : req.email}, {active : true}, {new : true}).exec();
      if(status){
        return res.status(200).json({status: true, message: "Registered Successfully "})
      } else {
        return res.status(200).json({status: false, message: "Please verify the link"})
      }
    } else {
      return res.status(200).json({status: true, message: "Please click the verification link"})
    }
    
  } catch (error) {
    
  }
}


async function login(req,res,next){

  try {
    let findDetails = await userSchema.findOne({email: req.email}).exec()

    console.log("findDetails", findDetails)
    if(!findDetails){
      return res.status(200).json({status: false, message: "Email id is not exists pls register"})
    } else {
      // let isMatch = await bcrypt.compare(req.password, findDetails.password);
      let hashedPassword = CryptoJS.AES.decrypt(
        findDetails.password,
        process.env.PASS_SEC
      )

      let password = hashedPassword.toString(CryptoJS.enc.Utf8);
      console.log(password)

      if(password == req.password){
        //update login status
        let loginStatusUpdate = await userSchema.findOneAndUpdate({uuid : findDetails}, {loginStatus : true}, {new : true}).exec();
        let payload = {uuid : findDetails.uuid, isAdmin : findDetails.isAdmin }
        let jwtToken = jwt.sign(payload, process.env.SECRET_KEY)
        findDetails.token = jwtToken;
        return res.status(200).json({status: "success", message: "Login successfully", data : findDetails})
      } else {
        return res.status(200).json({status: "failure", message: "Incorrect password"})
      }
    }
  } catch (error) {
    console.log("error",error)
  }

}


async function forgotPassword(req,res,next){
 try {
   
  if(req.email){
    let otp = otpGenerator.generate(4, {lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false})
    await sendEmail(req.email, "Otp Verification", otp); 
    return res.status(200).json({status: true, message: "Otp sent to your mail", otp:otp})
  }
 } catch (error) {
   console.log(error)
 }
}


async function getallUser(req, res, next){
  try {
    let userDetails = await userSchema.find().exec();
    if(userDetails){
      return res.status(200).json({status: true, message: "user Details are fetched", data:userDetails})
    } else {
      return res.status(200).json({status: false, message: "user Details are not fetched", data:userDetails})
    }
  } catch (error) {
    console.log(error)
  }
}

async function updateUser(req, res, next){
  try {
    console.log("req", req)
    if(req.email){
      let updateData = await userSchema.findOneAndUpdate({email : req.email}, req.data , {new : true} ).exec();
      if(updateData){
        return res.status(200).json({status: true, message: "user data updated successfully", data:updateData})
      } else {
        return res.status(200).json({status: false, message: "user Details are not update", data:updateData})
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function sendEmailAWS(req,res){
  sendAWSEmail()
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
