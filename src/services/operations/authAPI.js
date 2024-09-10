import { setLoading, setToken } from "../../slice/authSlice";
import { apiConnector } from "../../services/apiConnector"
import toast from "react-hot-toast";
import { authEndPoints, settingsEndPoints } from "../api";
import { setUser } from "../../slice/profileSlice";


export const getResetPasswordToken = (email, setEmailSent) => {

    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", authEndPoints.RESETPASSWORDTOKEN_API, { email });
            console.log("reset password response", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Email sent successfully!");
            setEmailSent(true);
        } catch (error) {
            console.log(error);
            toast.error("Failed to send email for resetting password");
        }

        dispatch(setLoading(false));
    }
}

export const resetPassword = (password, confirmPassword, token) => {

    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", settingsEndPoints.CHANGE_PASSWORD_API, { password, confirmPassword, token });
            console.log("reset password response", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update password");
        }

        dispatch(setLoading(false));
    }
}

export const sendotp = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("POST", authEndPoints.SENDOTP_API, { email })
            console.log("sendotp api response", response);
            console.log(response.data.success);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email");

        } catch (error) {
            console.log(error);
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const signup = (accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", authEndPoints.SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            console.log("signup api response", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup successful");
            navigate("/login");
        } catch (error) {
            console.log("signup error", error);
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }
}

export const login = async (email, password, navigate, dispatch) => {
    // return async (dispatch) => {
    const toastId = toast.loading("Loading");
    dispatch(setLoading(true));

    try {
        const response = await apiConnector("POST", authEndPoints.LOGIN_API, { email, password });
        console.log("login response", response);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Login Successful");
        dispatch(setToken(response.data.token));
        dispatch(setUser(response?.data?.user));

        const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

        dispatch(setUser({ ...response.data.user, image: userImage }))

        localStorage.setItem("token", JSON.stringify(response.data.token));

        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/dashboard/my-profile")
    } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Can't login")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    // }
}

export const logout = async (navigate, dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out");
    navigate("/");
}