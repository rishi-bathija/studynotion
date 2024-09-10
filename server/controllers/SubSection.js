const Section = require("../models/section");
const SubSection = require("../models/subSection");
const { uploadImage } = require("../utils/imageUploader");
require("dotenv").config();

// create a sub-section and insert its object id to the section schema
exports.createSubSection = async (req, res) => {
    try {
        // fetch data
        const { title, description, sectionId } = req.body;

        // extract file/video
        const video = req.files.video;

        // data validation
        if (!title || !description || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        console.log(video)
        // upload video to cloudinary
        const uploadVideo = await uploadImage(video, process.env.FOLDER_NAME)

        // create subsection
        const newSubSection = await SubSection.create({
            title: title, description: description, timeDuration: `${uploadVideo.duration}`, videoUrl: uploadVideo.secure_url
        });

        // update the section with sub-section objectId;
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: { subSection: newSubSection._id }
            },
            { new: true }).populate("subSection").exec();

        // hw:-log updatedSection here after adding populate query

        // return response
        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            updatedSection,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message,
        })
    }
}


exports.updateSubSection = async (req, res) => {
    try {
        const { title, description, subSectionId, sectionId } = req.body;

        // if (!title || !description || !subSectionId || !sectionId) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields are required",
        //     })
        // }

        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }

        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadVideo = await uploadImage(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadVideo.secure_url;
            subSection.timeDuration = `${uploadVideo.duration}`;
        }

        await subSection.save()

        const updatedSection = await Section.findById(sectionId).populate('subSection');

        console.log("updated section", updatedSection);

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedSection,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot update section. Please try again",
            error: error.message,
        })
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
        // get the id from the url parameters
        const { subSectionId, sectionId } = req.body;

        // validation
        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // remove the subsection from section by $pull
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        // find by id and delete
        const subSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!subSection) {
            return res.status(404).json({ success: false, message: "SubSection not found" })
        }

        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate('subSection');

        // return response
        return res.status(200).json({
            success: true,
            message: "Sub-section deleted successfully",
            updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot delete sub-section. Please try again",
            error: error.message,
        })
    }
}