const BASE_URL = process.env.REACT_APP_BASE_URL

// categories api
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// auth endpoints
export const authEndPoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const settingsEndPoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
}

export const profileEndPonts = {
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

export const courseEndPoints = {
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_API:
        BASE_URL + "/course/getFullCourseDetails",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
}

export const catalogData = {
    CATALOG_PAGE_DATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

export const studentEndPoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const ratingEndpoints = {
    REVIEW_DETAILS_API: BASE_URL + "/course/getReviews",
}