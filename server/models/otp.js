const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/tempates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60, // The document will be automatically deleted after 5 minutes of its creation time
    },
})

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", emailTemplate(otp));

        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occoured while sending mail", error);
        throw error;
    }
}

// Define a post-save hook to send email after the document has been saved
otpSchema.pre("save", async function (next) {
    console.log("New document saved to database");

    try {
        await sendVerificationEmail(this.email, this.otp);
        next();
    } catch (error) {
        console.log("Error sending email:", error);
        next(error); // Pass the error to the next middleware
    }
})

module.exports = mongoose.model("OTP", otpSchema);