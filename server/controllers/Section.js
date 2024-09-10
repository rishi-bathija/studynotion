const Section = require("../models/section");
const Course = require("../models/course");
const subSection = require("../models/subSection");

// create a section and insert its object id to the course schema
exports.createSection = async (req, res) => {
    try {
        // fetch data
        const { sectionName, courseId } = req.body;
        console.log('sectionname', sectionName);
        console.log('courseid', courseId);
        // data validation
        // if (!sectionName || !courseId) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields are required",
        //     })
        // }

        // create section
        const newSection = await Section.create({ sectionName });

        // update the course with section objectId;
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: { courseContent: newSection._id }
            },
            { new: true }).populate({
                path: "courseContent",
                populate: { path: "subSection" }
            }).exec();

        // return response
        console.log('updated course', updatedCourse);
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot create section. Please try again",
            error: error.message,
        })
    }
}

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId, courseId } = req.body;

        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName
            },
            { new: true },
        );

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse,
            updatedSection
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot update section. Please try again",
            error: error.message,
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        // Validation
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Find the section
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(400).json({
                success: false,
                message: "Section not found",
            });
        }

        // Delete all subsections
        await subSection.deleteMany({ _id: { $in: section.subSection } });

        // Delete the section
        await Section.findByIdAndDelete(sectionId);

        // Update the course by removing the section from the courseContent array
        await Course.findByIdAndUpdate(courseId, {
            $pull: { courseContent: sectionId },
        });

        // Find the updated course and populate courseContent and subSections
        const course = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: { path: 'subSection' },
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            course,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot delete section. Please try again",
            error: error.message,
        });
    }
};
