import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, html) =>{
    try {
        const transport = nodemailer.createTransport({
            host : process.env.HOST,
            service : process.env.SERVICE,
            port : 587,
            auth : {
                user : process.env.USER,
                pass : process.env.PASS,
            }
        });

        await transport.sendMail({
            from : process.env.USER,
            to : email,
            subject : subject,
            html : html,
        })

        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent", error);
    }
}

export default sendEmail