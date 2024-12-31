import { apiConnector } from "../../services/apiConnector"
import toast from "react-hot-toast";
import { settingsEndPoints } from "../api";
import { setUser } from "../../slice/profileSlice";


export const updateDisplayPicture = async (token, formData, dispatch) => {

    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("PUT", settingsEndPoints.UPDATE_DISPLAY_PICTURE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("update display picture api response", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Profile Picture Updated successfully!");
        dispatch(setUser(response.data.data));
    } catch (error) {
        console.log(error);
        toast.error("Failed to upadate profile photo. Please try again.");
    }
    toast.dismiss(toastId);
}

export const updateProfile = async (token, formData, dispatch) => {

    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("PUT", settingsEndPoints.UPDATE_PROFILE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("update profile response", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        const userImage = response.data.updatedUserDetails.image ? response.data.updatedUserDetails.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

        dispatch(setUser({ ...response.data.updatedUserDetails, image: userImage }));

        toast.success("Profile Updated successfully!");
    } catch (error) {
        console.log(error);
        toast.error("Failed to upadate profile. Please try again.");
    }
    toast.dismiss(toastId);
}

export const changePassword = async (token, formData, dispatch) => {

    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", settingsEndPoints.CHANGE_PASSWORD_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("change password response", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Password Changed successfully!");
    } catch (error) {
        console.log(error);
        toast.error("Failed to upadate profile. Please try again.");
    }
    toast.dismiss(toastId);
}

