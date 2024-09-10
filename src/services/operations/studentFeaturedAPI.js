// razorpay frontend integeration
// 1) load the script
// 2) create options object to open razorpay modal

import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { studentEndPoints } from "../api";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slice/courseSlice";
import { resetCart } from "../../slice/cartSlice";

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading");
    try {
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", studentEndPoints.COURSE_PAYMENT_API, { courses }, { Authorization: `Bearer ${token}` });

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("printing order response", orderResponse);
        // options
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "Studynotion",
            description: "Thank you for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                // send payment successful email
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);

                // verify payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            }
        }

        const paymentWindow = new window.Razorpay(options);
        paymentWindow.open();
        paymentWindow.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch (error) {
        console.log(error);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}

const sendPaymentSuccessEmail = async (response, amount, token) => {
    try {
        await apiConnector(
            "POST",
            studentEndPoints.SEND_PAYMENT_SUCCESS_EMAIL_API,
            { orderId: response.razorpay_order_id, paymentId: response.razorpay_payment_id, amount },
            { Authorization: `Bearer ${token}` });
    } catch (error) {
        console.log("Payment success email error", error);
    }
}

const verifyPayment = async (bodyData, token, navigate, dispatch) => {
    console.log('bodydata', bodyData);
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST",
            studentEndPoints.COURSE_VERIFY_API,
            bodyData,
            { Authorization: `Bearer ${token}` });

        console.log('response', response);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment successfull, you are added to course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("Payment verify error", error);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
