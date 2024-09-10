// steps to razorpay integeration to buy product:-
// 1) use orders API and create an order

// var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

// instance.orders.create({
//   "amount": 50000,
//   "currency": "INR",
// (optional):-
//   "receipt": "receipt#1",
//   "partial_payment": false,
//   "notes": {
//     "key1": "value3",
//     "key2": "value2"
//   }
// })


// 2) checkout options (not needed for now)

// 3) store fields in your server:- whenever an order is created, the following response is generated:-

// {
//     "razorpay_payment_id": "pay_29QQoUBi66xm2f",
//     "razorpay_order_id": "order_9A33XWu170gUtm",
//     "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
//   }

// 4) verify payment signature:- Authorization of the payment that has been done

// 3 order states:- created, attempted, paid

// payment integeration:-
// 1) capturePayment():- get the courseID and userId from req body and validate it (check if all fields are inserted, if this course has already been bought by the same user) and create an order
// 2) verify():- once the interaction between the bank and razorpay is successfull, a web-hook(kind of a notification) is setup on razorpay. On this web-hook, for each successful transaction,an api route is executed which is present in your website.To ensure that the api route is been executed by razorpay only(integerity,authenticity), a secret key is provided, and this secret key is then verified on the website route.

const { default: mongoose } = require("mongoose");
const { instance } = require("../config/Razorpay");
const { courseEnrollmentEmail } = require("../mail/tempates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/tempates/paymentSuccessfulEmail");

const Course = require("../models/course");
const courseProgressModel = require("../models/courseProgress");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
// const { courseEnrollmentMail } = require("../mail/templates/courseEnrollmentMail");
const crypto = require("crypto");


// capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
    // get courseid and userid
    const { courses } = req.body;
    const userId = req.user.id;

    // validation (cehck for empty fields, user already pay for same course)
    if (courses.length === 0) {
        return res.json({
            success: false,
            messsage: "Please provide valid course id",
        })
    }

    let total_amount = 0;

    for (const courseId of courses) {
        // valid course detail
        let course;
        try {
            course = await Course.findById({ _id: courseId });
            if (!course) {
                return res.json({
                    success: false,
                    messsage: "Couldn't find the course",
                })
            }

            // convert string type of the user id to object id type 
            console.log("userid", userId);

            const uid = new mongoose.Types.ObjectId(userId);
            console.log("uiddd", uid);
            console.log("enrolled", course.studentsEnrolled);

            if (course.studentsEnrolled.includes(uid)) {
                return res.json({
                    success: false,
                    messsage: "Student is already enrolled",
                })
            }

            // order create
            total_amount += course.price;
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error.message })
        }
    }

    const options = {
        amount: total_amount * 100,
        currency: 'INR',
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        // return res
        return res.json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            messsage: "Couldn't initiate an order",
        })
    }
}

// verify razorpay and server signature
// exports.verifySignature = async (req, res) => {
//     const webhooksecret = "12345678";

//     const signature = req.headers("x-razorpay-signature");

//     const shasum = crypto.createHmac("sha256", webhooksecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("payment is authorized");

//         const { userId, courseId } = req.body.payload.payment.entity.notes;

//         try {
//             // find course and insert the student in it
//             const enrolledCourse = await Course.findOneAndUpdate({ _id: courseId },
//                 { $push: { studentsEnrolled: userId } },
//                 { new: true });

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     messsage: "Course not found",
//                 })
//             }

//             console.log(enrolledCourse);

//             // find student and update course to the list of enrolled courses

//             const studentEnrolled = await User.findOneAndUpdate({ _id: userId },
//                 { $push: { courses: courseId } }, { new: true });

//             console.log(studentEnrolled);

//             // confirmation mail send
//             const emailResponse = mailSender(studentEnrolled.email, "Congrats", "Course has been added");

//             return res.status(200).json({
//                 success: true,
//                 message: "Signature verified and course added",
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: error.message,
//             })
//         }
//     }
//     else {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid request",
//         })
//     }
// }


exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    console.log('razorpayOrderId', razorpay_order_id);
    console.log('razorpayPaymentId', razorpay_payment_id);
    console.log('razorpasignature', razorpay_signature);
    console.log('courses', courses);
    console.log('userId', userId);
    // if (
    //     !razorpay_order_id ||
    //     !razorpay_payment_id ||
    //     !razorpay_signature ||
    //     !courses ||
    //     !userId
    // ) {
    //     return res.status(400).json({ success: false, message: "All fields are required" })
    // }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if (expectedSignature === razorpay_signature) {
        console.log("i am inside if condition");
        await enrollStudents(courses, userId, res);
        return res.status(200).json({
            success: true,
            message: 'Payment verified'
        })
    }

    return res.status(500).json({ success: false, message: "Payment Failed" })
}

const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please Provide Course ID and User ID"
        })
    }

    console.log("i am here");
    for (const courseId of courses) {
        try {
            // Find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate({ _id: courseId }, { $push: { studentsEnrolled: userId } }, { new: true });

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    error: "Course not found"
                })
            }

            console.log("Updated course: ", enrolledCourse);

            const courseProgress = await courseProgressModel.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            })

            // Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(userId, {
                $push: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                }
            }, { new: true });

            if (!enrolledStudent) {
                return res.status(500).json({
                    success: false,
                    error: "User not found",
                });
            }

            console.log("Enrolled student: ", enrolledStudent)

            const emailResponse = await mailSender(enrolledStudent.email, `Successfully Enrolled into ${enrolledCourse.courseName}`, courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`))

            console.log("Email sent successfully: ", emailResponse.response)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }
    try {
        const enrolledStudent = await User.findById(userId);

        await mailSender(enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount / 100, orderId, paymentId));
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not send email",
        })
    }

}