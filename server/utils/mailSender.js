// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const mailSender = async (email, title, body) => {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: 'bathijarishi@gmail.com',
//                 pass: 'ioeblbxbnegoozdx',
//             }
//         })

//         let info = await transporter.sendMail({
//             from: 'StudyNotion',
//             to: `${email}`,
//             subject: `${title}`,
//             html: `${body}`,
//         })
//         console.log("Info", info);
//         return info;
//     } catch (error) {
//         console.log(error.message);
//         throw error;
//     }
// }

// module.exports = mailSender;



require("dotenv").config();
const mailgun = require("mailgun-js");

const api_key = process.env.MAILGUN_APIKEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;


console.log("api_key:", api_key);
console.log("DOMAIN:", DOMAIN);

const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

const mailSender = async (email, title, body) => {
    try {
        const data = {
            from: 'StudyNotion <bathijarishi@gmail.com>', // Update with your Mailgun verified domain
            to: email,
            subject: title,
            html: body,
        };

        const info = await mg.messages().send(data);
        console.log("Info", info);

        return info;
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = mailSender;