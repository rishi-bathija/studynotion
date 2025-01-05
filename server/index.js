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

// // app.use(express.json({ limit: '50mb' }));
// console.log(app.use(express.urlencoded({ limit: '50mb', extended: true })));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));

app.use(cookieParser());
console.log("i am here")
app.use(
    cors({
        origin: ["http://localhost:3000", "https://studynotion-frontend-blond.vercel.app"],
        credentials: true,
    })
);

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp", limits: { fileSize: 50 * 1024 * 1024 } }));

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

