const nodemailer = require("nodemailer");
require("dotenv").config();
const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'rishibhatija1212@gmail.com',
                pass: 'bmwenelserisirdb',
            }
        })

        let info = await transporter.sendMail({
            from: 'StudyNotion',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log("Info", info);
        return info;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = mailSender;