const cloudinary = require("cloudinary").v2;

exports.uploadImage = async (file, folder, height, quality) => {
    try {
        const options = {
            folder,
            resource_type: "auto",
            timeout: 300000 // Set the timeout here
        };

        if (quality) {
            options.quality = quality;
        }
        if (height) {
            options.height = height;
        }
        options.resource_type = "auto";

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error("Error during image upload to Cloudinary:", error);
        throw error; // Re-throw the error to handle it in the calling function
    }
}