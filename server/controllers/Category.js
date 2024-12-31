const Category = require("../models/category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            })
        }

        // Check if the category with the given name already exists

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "A category with the same name already exists.",
            });
        }

        const createCategory = await Category.create({
            name: name,
            description: description,
        })

        return res.status(200).json({
            success: true,
            message: "Category created sucessfully",
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}

exports.showAllCategories = async (req, res) => {
    try {
        // return all the tags where both name and description are present
        const allCategories = await Category.find({}, { name: true, description: true }).populate("courses").exec();

        return res.status(200).json({
            success: true,
            message: "All categories returned successfully",
            data: allCategories,
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}

exports.categoryPageDetails = async (req, res) => {
    try {
        // get categoryid
        const { categoryId } = req.body;
        console.log('category Id', categoryId);

        // get courses for specified categories
        const selectedCategory = await Category.findById(categoryId).populate({ path: "courses", match: { status: 'Published' }, populate: 'ratingAndReviews' }).exec();

        // Handle the case when the category is not found
        if (!selectedCategory) {
            console.log("Category not found.")
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }

        // get courses for different categories
        const otherCategories = await Category.find({ _id: { $ne: categoryId } }).populate("courses").exec();

        let differentCategory = await Category.findOne(otherCategories[getRandomInt(otherCategories.length)]._id).populate({
            path: "courses",
            match: { status: "Published" },
        }).exec();

        const allCategories = await Category.find().populate({ path: 'courses', match: { status: 'Published' }, populate: { path: 'instructor' } }).exec();

        const allCourses = allCategories.flatMap((category) => category.courses);

        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);


        // return res
        return res.status(200).json({
            success: true,
            message: "request successfull",
            selectedCategory,
            differentCategory,
            mostSellingCourses,
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            message: error.message,
        })
    }
}