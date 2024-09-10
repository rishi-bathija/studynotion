const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");

const cookieParser = require("cookie-parser");
const { dbConnect } = require("./config/db");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const port = process.env.PORT || 4001;


dbConnect();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running",
    })
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})

