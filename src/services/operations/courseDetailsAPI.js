import toast from "react-hot-toast";
import { courseEndPoints } from "../api"
import { apiConnector } from "../apiConnector"

export const addCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector('POST', courseEndPoints.CREATE_COURSE_API, data, {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("create course api response", response);

        if (!response?.data?.success) {
            throw new Error("Can't update course detaile");
        }
        toast.success("Course Details Added Successfully");
        result = response?.data?.newCourse;
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
        throw error;
    }
    toast.dismiss(toastId);
    return result;
}

export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector('POST', courseEndPoints.EDIT_COURSE_API, data, {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log("edit course api response", response);

        if (!response?.data?.success) {
            throw new Error("Can't update course detaile");
        }
        toast.success("Course Details Updated Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchCourseCategories = async () => {
    let categories = [];
    try {
        const response = await apiConnector('GET', courseEndPoints.COURSE_CATEGORIES_API);

        console.log("course categories api response", response);

        if (!response?.data?.success) {
            throw new Error("Can't fetch course categories");
        }

        categories = response?.data?.data;
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return categories;
}

export const updateSection = async (data, token) => {
    console.log('update section token', token);
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector('POST', courseEndPoints.UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("update section api response", response);

        if (!response?.data?.success) {
            throw new Error("Can't update section");
        }
        toast.success("Course section Updated Successfully");
        result = response?.data?.updatedCourse;
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const createSection = async (data, token) => {
    console.log('create section token', token);
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector('POST', courseEndPoints.CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("create section api response", response);

        if (!response?.data?.success) {
            throw new Error("Can't create section");
        }
        toast.success("Course Section created successfully");
        result = response?.data?.updatedCourse;
    } catch (error) {
        console.log("CREATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading");
    try {
        const response = await apiConnector('POST', courseEndPoints.DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log('delete section api response', response);

        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section");
        }

        toast.success("Course Section Deleted");
        result = response?.data?.course
    } catch (error) {
        console.log("DELETE SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseEndPoints.DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("DELETE SUB-SECTION API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Delete Lecture");
        }

        toast.success("Lecture Deleted");
        result = response?.data?.updatedSection;
    } catch (error) {
        console.log("DELETE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndPoints.CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("CREATE SUB-SECTION API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture");
        }

        toast.success("Lecture Added")
        result = response?.data?.updatedSection;
    } catch (error) {
        console.log("CREATE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndPoints.UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("UPDATE SUB-SECTION API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }

        toast.success("Lecture Updated");
        result = response?.data?.updatedSection;
    } catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading");
    let result = [];

    try {
        const response = await apiConnector('GET', courseEndPoints.GET_ALL_COURSE_API);

        if (!response.data.success) {
            throw new Error("Coudn't fetch all courses");
        }
        result = response.data.allCourses;
    } catch (error) {
        console.log("GET ALL COURSES API ERROR...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchInstructorCourses = async (token) => {
    const toastId = toast.loading("Loading");
    let result = [];

    try {
        const response = await apiConnector('GET', courseEndPoints.GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log("INSTRUCTOR COURSES API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error("Coudn't fetch all courses");
        }
        result = response.data.data;
    } catch (error) {
        console.log("GET ALL COURSES API ERROR...", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", courseEndPoints.DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`,
        });
        console.log("DELETE COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course");
        }
        toast.success("Course Deleted");
    } catch (error) {
        console.log("DELETE COURSE API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}


// get full details of a course
export const getFullCourseDetails = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector(
            "POST",
            courseEndPoints.GET_FULL_COURSE_DETAILS_API,
            {
                courseId,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try {
        const response = await apiConnector("POST", courseEndPoints.COURSE_DETAILS_API, { courseId });

        console.log("COURSE_DETAILS_API API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data;
        console.log("result", result);
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
}

// create a rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
        const response = await apiConnector("POST", courseEndPoints.CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE RATING API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Rating")
        }
        toast.success("Rating Created")
        success = true
    } catch (error) {
        success = false
        console.log("CREATE RATING API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
}

export const markLectureAsComplete = async (data, token) => {
    let result = null;
    console.log("mark complete data", data);
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", courseEndPoints.LECTURE_COMPLETION_API, data, {
        Authorization: `Bearer ${token}`,
      });
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      );
  
      if (!response.data.message) {
        throw new Error(response.data.error);
      }
      toast.success("Lecture Completed");
      result = true;
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
      toast.error(error.message);
      result = false;
    }
    toast.dismiss(toastId);
    return result;
  }