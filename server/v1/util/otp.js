import twilio from 'twilio';
import otpGenerator from 'otp-generator';

const otp = async (contactNumber) =>{
    try {
       let otp = otpGenerator.generate(4, {lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false})
       const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = new twilio(accountSid, authToken);

        console.log(otp)

        client.messages.create({
            body: otp,
            from: '+17079853635',
            to: "+91"+ contactNumber
            
        })
        .then((message) => console.log(message))
        .catch((err)=>{
            console.log(err);
        })

    } catch (error) {
        console.log("error", error)
    }
}

export default otp;