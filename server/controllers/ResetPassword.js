const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        // fetch email from req
        const { email } = req.body;
        // check if user with this email exists or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your email isn't registered with us",
            })
        }
        // generate token
        const token = crypto.randomUUID();
        // update token by adding token and token expiry time(here, token expiry time is 5 min)
        // {new:true} returns the updated new document
        const updatedDetails = await User.findOneAndUpdate({ email }, { token: token, tokenExpire: Date.now() + 5 * 60 * 1000 }, { new: true });

        // create url for the password updation
        const url = `http://localhost:3000/update-password/${token}`;

        // sened mail containing the url
        await mailSender(email, "Password reset link", `Password reset link: ${url}`);

        // return response
        return res.status(200).json({
            success: true,
            message: "Email sent successfull, please check you mail and update password",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending the reset password mail",
        })
    }
}
// resetPassword
exports.resetPassword = async (req, res) => {
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body;
        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password not matching",
            })
        }

        // get user details from db using token
        const userDetails = await User.findOne({ token: token });
        // if no entry - invalid token
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            })
        }
        // token time check
        if (userDetails.tokenExpire < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Token is expired",
            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true });
        // return res
        return res.status(200).json({
            success: true,
            message: "Password reset successfull",
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Can't reset password",
        })
    }
}