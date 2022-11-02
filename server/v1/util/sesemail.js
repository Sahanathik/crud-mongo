import AWS from 'aws-sdk';

const AWSService = {
    accessKey : process.env.AWS_ACCESS_KEY_ID,
    secretKey : process.env.AWS_SECRET_ACCESS_KEY,
    region : process.env.AWS_REGION,
}

console.log(AWSService)

const SES = new AWS.SES(AWSService);

const sendAWSEmail = async()=>{

try {

    var params = {
        Destination: { /* required */
          CcAddresses: [
            process.env.TO_EMAIL,
            /* more items */
          ],
          ToAddresses: [
            process.env.TO_EMAIL,
            /* more items */
          ]
        },
        Message: { /* required */
          Body: { /* required */
            Html: {
             Charset: "UTF-8",
             Data: `<h1>Email Sent successfully<\h1>`
            },
            Text: {
             Charset: "UTF-8",
             Data: "TEXT_FORMAT_BODY"
            }
           },
           Subject: {
            Charset: 'UTF-8',
            Data: 'Test email'
           }
          },
        Source: process.env.FROM_EMAIL, /* required */
        ReplyToAddresses: [
            process.env.TO_EMAIL,
          /* more items */
        ],
      };
    
 let emailSent = new AWS.SES(AWSService).sendEmail(params).promise().then((res)=>{
    console.log(res)
 })
    
} catch (error) {
    console.log(error)
}
   

      
}

export default sendAWSEmail