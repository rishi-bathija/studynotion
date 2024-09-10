const optGenerator = require("otp-generator");
const User = require("../models/User");
const OTP = require("../models/otp");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const JWT = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/tempates/emailVerificationTemplate");
require("dotenv").config();


// sendOTP
exports.sendOTP = async (req, res) => {
    try {
        // fetch email from req body
        const { email } = req.body;

        // check if user already exist
        const checkUserPresent = await User.findOne({ email });

        // if user already exist, then return response
        if (checkUserPresent) {
            return res.status(401).json({
                succes: false,
                message: "User already registered",
            })
        }

        // generate otp
        let otp = optGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        // check if otp is unique or not
        const result = await OTP.findOne({ otp: otp });

        // keep generating a new otp till its same as the one that exist in db 
        while (result) {
            otp = optGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })

            // result = await OTP.findOne({ otp: otp });
        }
        // create an entry for otp
        const otpBody = await OTP.create({ email, otp })
        console.log(otpBody);

        // return response
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            succes: false,
            message: error.message,
        })
    }
}
// signup
exports.signup = async (req, res) => {

    try {
        // fetch data from req body
        const { firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp } = req.body;

        // validate the data
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        // match the password and confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and ConfirmPassword fields do not match",
            })
        }

        // check if user already exist in db
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            })
        }

        // find the most recent otp stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recentotp", recentOtp);
        // validate otp
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            })
        } else if (recentOtp[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // entry create in db
        const profileDetails = await Profile.create({ gender: null, dateOfBirth: null, about: null, contactNumber: null });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            contactNumber,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        // return res
        return res.status(200).json({
            success: true,
            message: "User registered successsfully",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again",
        })
    }

}

// login
exports.login = async (req, res) => {
    try {
        // get data from req body
        const { email, password } = req.body;

        // validate data
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check if user exist or not
        const user = await User.findOne({ email }).populate("additionalDetails");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first",
            })
        }

        // generate jwt token, after password mattching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

            user.token = token;
            user.password = undefined;

            // create a cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully",
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password incorrect",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login, please try again",
        })
    }
}
// change password
exports.changePassword = async (req, res) => {
    // get data from req body
    // get oldPassword, newPassword, confirmPassword
    // validation

    // update password in db
    // send mail-password updated
    // return response
    try {
        // get data from req body
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // validation
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // check if new password and confirm password match
        // if (newPassword !== confirmPassword) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "New Password and Confirm Password fields do not match",
        //     });
        // }

        // check if the user is authenticated
        const userId = req.user.id; // Assuming you have middleware to attach user information to req
        const user = await User.findById(userId);

        // check if old password is correct
        if (!(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        // hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // update password in db
        user.password = hashedNewPassword;
        await user.save();

        // send mail-password updated
        const emailBody = "Your password has been updated successfully.";
        await mailSender(user.email, "Password Updated", emailBody);

        // return response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update password, please try again",
        });
    }
}