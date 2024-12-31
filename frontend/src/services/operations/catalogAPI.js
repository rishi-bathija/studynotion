import toast from "react-hot-toast";
import { catalogData } from "../api"
import { apiConnector } from "../apiConnector"

export const getCatalogPageDetails = async (categoryId) => {
    console.log('categoryid', categoryId);
    const toastId = toast.loading('Loading...');
    let result = [];
    try {
        const response = await apiConnector('POST', catalogData.CATALOG_PAGE_DATA_API, { categoryId });
        console.log("CATAOLG_DATA_API RESPONSE............", response);
        if (!response.data.success) {
            throw new Error('Could not fetch category page data');
        }
        result = response.data;
    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR....", error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}