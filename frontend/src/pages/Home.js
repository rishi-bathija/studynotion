import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import Buttons from '../components/core/HomePage/Buttons';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import bgHome from "../assets/Images/bghome.svg"
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningSection from "../components/core/HomePage/LearningSection"
import Instructor from "../assets/Images/Instructor.png"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
    return (
        <div>
            <div className="relative mx-auto flex flex-col w-11/12 items-center justify-between text-white max-w-maxContent">
                {/* Enroll Now Button */}
                <Link to="/signup">
                    <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 shadow-[0_1.5px_rgba(255,255,255,0.5)] hover:shadow-none">
                        <div className="flex flex-row items-center gap-2 px-8 py-2 transition-all duration-200 group-hover:bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                            <p>Start Your Coding Journey Now</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                {/* Heading */}
                <div className="text-center text-4xl font-semibold my-12">
                    Elevate Your Future with
                    <HighlightText text={'Cutting-Edge Coding Skills'} />
                </div>
                {/* Subheading */}
                <div className="w-[95%] text-center font-semibold text-richblack-500">
                    <p>
                        Embark on a transformative learning experience with our online coding courses. Master in-demand coding skills at your own pace, from anywhere in the world. Gain access to real-world projects, quizzes, and personalized feedback from industry experts.
                    </p>
                </div>
                {/* Buttons */}
                <div className="flex flex-row gap-7 mt-8">
                    <Buttons linkto="/signup" active={true}>
                        Unlock Your Potential
                    </Buttons>
                    <Buttons linkto="/login" active={false}>
                        Explore Free Demo
                    </Buttons>
                </div>
                {/* Video */}
                <div className="w-[95%] my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video muted loop autoPlay className="shadow-[20px_20px_5px]">
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>
                {/* Course Blocks */}
                <div className="max-w-[95%] my-20">
                    <CodeBlocks
                        direction="lg:flex-row"
                        heading={
                            <div className="text-4xl font-semibold">
                                Accelerate Your Career with
                                <HighlightText text={'Expert-Led Coding Courses'} />
                            </div>
                        }
                        subheading={
                            'Our courses are meticulously crafted and taught by industry experts with years of experience. Take control of your future and stay ahead in the rapidly evolving tech landscape.'
                        }
                        btn1={{
                            btnText: 'Enroll Now',
                            link: '/signup',
                            active: true,
                        }}
                        btn2={{
                            btnText: 'Learn More',
                            link: '/signup',
                            active: false,
                        }}
                        codeColor="text-yellow-200"
                        codeblock={`<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Document</title>
                        </head>
                        <body>
                        <h1><a href="/">Welcome to TechLearn</a></h1>
                        </body>
                        </html>`}
                        bgGradient="bg-gradient-to-r from-[#012B22] to-[#001B1D]"
                    />
                </div>
                <div className="max-w-[95%] my-20">
                    <CodeBlocks
                        direction="lg:flex-row-reverse"
                        heading={
                            <div className="text-4xl font-semibold">
                                Dive into Coding <HighlightText text={"Now"} />
                            </div>
                        }
                        subheading={
                            "Experience the thrill of coding instantly. Our interactive lessons empower you to write real code from your very first session, setting you on the fast track to success."
                        }
                        btn1={{
                            btnText: 'Start Coding',
                            link: "/signup",
                            active: true,
                        }}
                        btn2={{
                            btnText: "Learn More",
                            link: "/signup",
                            active: false,
                        }}
                        codeColor="text-white"
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        bgGradient="bg-gradient-to-r from-[#001B1D] to-[#012B22]"
                    />
                </div>
                <ExploreMore />
            </div>
            <div className="white bg-white">
                <div
                    className="image relative"
                    style={{ backgroundImage: `url(${bgHome})`, height: '300px' }}
                >
                    <div className="w-11/12 max-w-maxContent flex items-center mx-auto gap-5 justify-center">
                        <div className="buttons flex flex-row text-white gap-7 absolute top-[50%]">
                            <Buttons active={true} linkto={"/signup"}>
                                <div className="btn-content flex flex-row items-center gap-2">
                                    Explore Full Coding
                                    <FaArrowRight />
                                </div>
                            </Buttons>
                            <Buttons active={false} linkto={"/signup"}>
                                <div className="btn-content">
                                    Learn More
                                </div>
                            </Buttons>
                        </div>
                    </div>
                </div>

                <div className="w-11/12 max-w-maxContent justify-between gap-8 mx-auto flex items-center flex-col">
                    <div className="flex flex-row justify-between my-20 gap-7">
                        <div className="heading text-4xl font-semibold w-[45%]">
                            Get the skills you need for a
                            <HighlightText text={'job that is in demand'} />
                        </div>
                        <div className="subheading flex flex-col w-[40%]">
                            <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <div className="flex mt-5">
                                <Buttons active={true} linkto={"/signup"}>
                                    Learn More
                                </Buttons>
                            </div>
                        </div>
                    </div>

                    <TimelineSection />

                    <LearningSection />
                </div>

            </div>

            <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white mx-auto">
                <div className="flex flex-row gap-20 items-center mt-20">
                    <div className="image w-[50%] shadow-blue-200 shadow-[10px_10px_25px_0px]">
                        <img src={Instructor} alt="" className='shadow-[-20px_-20px_0px_0px]' />
                    </div>
                    <div className="flex flex-col w-[50%] gap-10">
                        <h2 className="text-4xl font-semibold w-[50%]">
                            Become an
                            <HighlightText text={"Instructor"} />
                        </h2>
                        <p className="font-medium w-[80%] text-richblack-300">
                            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </p>

                        <div className="w-fit">
                            <Buttons active={true} linkto={"/signup"}>
                                <div className="flex flex-row items-center gap-2">
                                    Start Teaching Today
                                    <FaArrowRight />
                                </div>
                            </Buttons>
                        </div>
                    </div>
                </div>
                <h2 className="text-4xl font-semibold mt-10 text-center">
                    Review from other learners
                </h2>
                {/* review slider */}
                <ReviewSlider />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
