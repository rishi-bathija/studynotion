const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const Course = require("../models/course");
const RatingAndReviews = require("../models/ratingAndReviews");

exports.createRating = async (req, res) => {
    try {
        // Fetch data from req body
        const userId = req.user.id;
        const { courseId, rating, review } = req.body;

        // Check if the user is enrolled in the course
        const enrollmentCheck = await User.findOne({
            _id: userId,
            courses: courseId,
        });

        if (!enrollmentCheck) {
            return res.status(403).json({
                success: false,
                message: "User is not enrolled in the course.",
            });
        }

        // Check if the user has already reviewed the course
        const existingReview = await RatingAndReviews.findOne({
            user: userId,
            courseId,
        });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "User has already reviewed this course.",
            });
        }

        // Create rating and review
        const newReview = new RatingAndReviews({
            user: userId,
            course: courseId,
            rating,
            review,
        });
        await newReview.save();

        // Update course with rating and review
        const updatedCourse = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    RatingAndReviews: newReview._id,
                }
            }, { new: true });

        console.log(updatedCourse);

        // return res
        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully.",
            review: newReview,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getAverageRating = async (req, res) => {
    try {
        // get courseid
        const { courseId } = req.body;

        // calculate average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        // return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        // if no rating/review exist
        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no ratings given till now",
            averageRating: 0,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllRatingReview = async (req, res) => {
    try {
        const allReviews = await RatingAndReviews.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "courseName",
            }).exec();

        return res.status(200).json({
            success: true,
            message: "All review fetched successfully",
            data: allReviews,
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}