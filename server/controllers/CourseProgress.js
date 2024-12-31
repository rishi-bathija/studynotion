const courseProgressModel = require("../models/courseProgress");
const subSectionModel = require("../models/subSection");

exports.updateCourseProgresss = async (req, res) => {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    console.log("courseId", courseId);
    console.log("userId", userId);


    try {
        // Check if the subsection is valid
        const subSection = await subSectionModel.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                error: "Invalid Subsection",
            })
        }

        // Find the course progress document for the user and course
        let courseProgress = await courseProgressModel.findOne({
            courseID: courseId,
            userId: userId,
        })

        if (!courseProgress) {
            // If course progress doesn't exist, create a new one
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            })
        } else {
            // If course progress exists, check if the subsection is already completed
            if (courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({ error: "Subsection already completed" })
            }


            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push((subSectionId));

            // Save the updated course progress
            await courseProgress.save();

            return res.status(200).json({ message: "Course progress updated" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}