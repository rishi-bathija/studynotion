const express = require("express");
const router = express.Router();
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments");
const { auth, isAdmin, isInstructor, isStudent } = require("../middlewares/auth");
verifyPayment
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
module.exports = router;
