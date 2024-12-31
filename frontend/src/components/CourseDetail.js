import React, { useState } from 'react';

const CourseCard = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle the dropdown
    };

    return (
        <div className="bg-richblack-900 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-maxContent bg-richblack-700 text-white p-8 rounded-lg shadow-md">
                {/* Course Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold">gerrerg</h1>
                        <p className="text-pure-greys-200 text-sm">eregereg</p>
                        <div className="flex items-center text-yellow-300">
                            <p>0</p>
                            <div className="ml-2">
                                <span className="text-yellow-300">☆☆☆☆☆</span>
                            </div>
                            <p className="ml-2 text-sm">(0 reviews)</p>
                            <p className="ml-4 text-sm">0 students enrolled</p>
                        </div>
                        <p className="text-xs text-pure-greys-200 mt-2">Created by Parag Choudhury</p>
                        <p className="text-xs text-pure-greys-200">Created at August 6, 2023 | 1:48 AM | English</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS4p62RxR7yH0Y9SCnqWwrzy4FCjOCXXzsFg&s"
                            alt="Course Thumbnail"
                            className="w-32 h-32 object-cover mb-2"
                        />
                        <button className="bg-yellow-300 text-black font-bold px-4 py-2 rounded-md">
                            Rs. 454
                        </button>
                        <p className="text-xs mt-2">30-Day Money-Back Guarantee</p>
                    </div>
                </div>

                {/* What You'll Learn */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold">What you'll learn</h2>
                    <p className="mt-2 text-pure-greys-200">gfgf</p>
                </div>

                {/* Course Content */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Course Content</h2>
                    <p className="mt-2 text-sm">1 section(s) | 1 lecture(s) | 1s total length</p>

                    {/* Dropdown Section */}
                    <div className="mt-4 bg-richblack-600 p-4 rounded-md">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            <h3 className="font-semibold">jhggy</h3>
                            <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                                ▼
                            </span>
                        </div>

                        {/* Conditionally render the dropdown content */}
                        {isOpen && (
                            <div className="mt-2 bg-richblack-500 p-2 rounded-md">
                                <p>gfgfg</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Author Section */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold">Author</h2>
                    <div className="flex items-center mt-2">
                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                            PC
                        </div>
                        <p className="ml-4">Parag Choudhury</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
