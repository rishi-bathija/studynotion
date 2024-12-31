import React, { useState } from "react";
import Footer from "./common/Footer";
import RatingStars from "./common/RatingStars";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import Img from "../assets/Images/boxoffice.png";

const CoursePage = () => {
    const [sections, setSections] = useState({
        python1: false,
        section2: false,
    });

    const toggleSection = (section) => {
        setSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const collapseAllSections = () => {
        setSections({ python1: false, section2: false });
    };
    return (
        <div className="bg-richblack-900 text-white min-h-screen">
            {/* Header Section */}
            <div className="relative bg-richblack-600 p-8 h-[300px]">
                <div className="max-w-6xl mx-auto relative">
                    {/* Left Section */}
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold">Dot Batch MERN Stack</h1>
                        <p className="text-richblack-200 text-lg">MERN Stack by me</p>
                        <div className="flex items-center gap-4 text-richblack-200">
                            <p className="flex items-center gap-1">
                                4 <RatingStars Review_Count={14} Star_Size={24} />
                            </p>
                            <p>14 reviews</p>
                            <p>24 students enrolled</p>
                        </div>
                        <p className="text-richblack-200">
                            Created By <span className="text-white font-semibold">Rahul Roy</span>
                        </p>
                        <div className="flex flex-wrap gap-4 text-richblack-200">
                            <p className="flex items-center gap-1">
                                <BiInfoCircle /> Created at May 27, 2023 | 1:01 AM
                            </p>
                            <p className="flex items-center gap-1">
                                <HiOutlineGlobeAlt /> English
                            </p>
                        </div>
                    </div>

                    {/* Overlapping CourseDetailsCard */}
                    <div className="absolute top-16 right-0 bg-richblack-700 rounded-lg p-6 w-[400px] flex flex-col gap-4 shadow-lg">
                        <img
                            src={Img}
                            alt="Course Thumbnail"
                            className="rounded-md h-[200px] w-full object-cover"
                        />
                        <p className="text-3xl font-bold text-yellow-500">Rs. 499</p>
                        <div className="flex flex-col gap-2">
                            <button className="bg-yellow-500 text-black py-2 rounded-md font-bold">
                                Buy Now
                            </button>
                            <button className="bg-richblack-800 text-white py-2 rounded-md font-bold border border-richblack-600">
                                Add to Cart
                            </button>
                        </div>
                        <p className="text-sm text-richblack-200">
                            30-Day Money-Back Guarantee
                        </p>
                        <div className="text-sm">
                            <p className="text-white font-bold mb-2">This Course Includes:</p>
                            <ul className="list-disc pl-5 text-richblack-200">
                                <li>Good Course</li>
                                <li>Fast Paced</li>
                            </ul>
                        </div>
                        <button className="bg-transparent text-blue-500 underline font-semibold text-sm">
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="max-w-6xl mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-4">What you'll learn</h2>
                <p className="text-richblack-200">Learn Postman</p>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-richblack-200">
                            2 section(s) 2 lecture(s) 10s total length
                        </p>
                        <button
                            className="text-yellow-500 font-semibold underline"
                            onClick={collapseAllSections}
                        >
                            Collapse all sections
                        </button>
                    </div>

                    {/* Section 1 */}
                    <div className="bg-richblack-800 p-4 rounded-md mb-4">
                        <button
                            className="w-full text-left font-semibold text-white flex justify-between items-center"
                            onClick={() => toggleSection("python1")}
                        >
                            Python1
                            <span>{sections.python1 ? "-" : "+"}</span>
                        </button>
                        {sections.python1 && (
                            <ul className="mt-2 pl-4 text-richblack-200">
                                <li>Lecture 1: Introduction</li>
                            </ul>
                        )}
                    </div>

                    {/* Section 2 */}
                    <div className="bg-richblack-800 p-4 rounded-md mb-4">
                        <button
                            className="w-full text-left font-semibold text-white flex justify-between items-center"
                            onClick={() => toggleSection("section2")}
                        >
                            Section 2
                            <span>{sections.section2 ? "-" : "+"}</span>
                        </button>
                        {sections.section2 && (
                            <ul className="mt-2 pl-4 text-richblack-200">
                                <li>Lecture 1: Advanced Topics</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>


            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default CoursePage;
