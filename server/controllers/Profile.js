// here, you can update the profileDetails which are already present in the db when the user did signup (profileDetails where initialized to null and where added to user) OR you can first create the profile details and then push the objectid of profile into the user
const courseProgressModel = require("../models/courseProgress");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/course");

const { uploadImage } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateProfile = async (req, res) => {
    try {
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            gender = "",
        } = req.body
        const id = req.user.id

        // Find the profile by id
        const userDetails = await User.findById(id)
        const profile = await Profile.findById(userDetails.additionalDetails)

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        })
        await user.save()

        // Update the profile fields
        profile.dateOfBirth = dateOfBirth
        profile.about = about
        profile.contactNumber = contactNumber
        profile.gender = gender

        // Save the updated profile
        await profile.save()

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec()

        return res.json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}
// delete account
exports.deleteAccount = async (req, res) => {
    try {
        // get id
        const { id } = req.user;
        const userDetails = await User.findById(id);
        // validation
        if (!userDetails) {
            return re.sstatus(400).json({
                succsess: false,
                message: "User not found",
            })
        }

        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        // hw: unenroll user form all the enrolled courses

        // delete user
        await User.findByIdAndDelete({ _id: id });

        // return res
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot complete the request",
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            userDetails
        })

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message,
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {

        const displayPicture = req.files.displayPicture;

        const userId = req.user.id;

        const uploadedImage = await uploadImage(displayPicture, process.env.FOLDER_NAME, 1000, 1000);

        console.log(uploadedImage);

        const updatedProfile = await User.findByIdAndUpdate({ _id: userId }, { image: uploadedImage.secure_url }, { new: true });

        res.send({
            success: true,
            message: "Image updated successfully",
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({ _id: userId }).populate({ path: "courses", populate: { path: "courseContent", populate: { path: "subSection", } } }).exec();

        userDetails = userDetails.toObject();

        console.log('userdetails', userDetails);

        var SubsectionLength = 0;
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }
            let courseProgressCount = await courseProgressModel.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            });

            courseProgressCount = courseProgressCount?.completedVideos.length;

            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100;
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier;
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Couldn't find user"
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        console.log('coursedetails', courseDetails);

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmtGenrated = course.price * totalStudentsEnrolled;


            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmtGenrated,
            }

            return courseDataWithStats;
        })

        console.log("coursedata", courseData);

        return res.status(200).json({
            success: true,
            courses: courseData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })

    }
}