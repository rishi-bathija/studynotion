import toast from "react-hot-toast"
import { profileEndPonts } from "../api";
import { apiConnector } from "../apiConnector";

export const getUserEnrolledCourses = async (token, dispatch) => {

    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", profileEndPonts.GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });

        console.log("user enrolled courses response", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        if (response.data.data) {
            result = response.data.data;
        } else {
            console.error("Response data does not contain 'data' key");
        }
    } catch (error) {
        console.log(error);
        toast.error("Couldn't get user enrolled courses. Please try again.");
    }
    toast.dismiss(toastId);
    return result;
}

export const getInstructorData = async (token) => {

    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", profileEndPonts.GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        });

        console.log("get instructor data response", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        if (response.data.courses) {
            result = response.data.courses;
        } else {
            console.error("Response data does not contain 'data' key");
        }
    } catch (error) {
        console.log(error);
        toast.error("Couldn't get instructor data. Please try again.");
    }
    toast.dismiss(toastId);
    return result;
}