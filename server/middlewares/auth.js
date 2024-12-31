const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        // if token missing, then return response
        if (!token) {
            return res.status(401).json({
                successs: false,
                message: "Token is missing",
            })
        }
        console.log('token', token);
        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log('decode', decode);
            req.user = decode;
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                successs: false,
                message: "Token is invalid",
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            successs: false,
            message: "Something went wrong while validating the token",
        })
    }
}

// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                successs: false,
                message: "This is a protected route for students only",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: "User can't be verified, try again later",
        })
    }
}
// isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                successs: false,
                message: "This is a protected route for instructor only",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: "User can't be verified, try again later",
        })
    }
}
// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                successs: false,
                message: "This is a protected route for admin only",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            successs: false,
            message: "User can't be verified, try again later",
        })
    }
}