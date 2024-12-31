import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from 'react-router-dom'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink2 } from '../../data/footer-links';

const Footer = () => {
    const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
    const Resources = [
        "Articles",
        "Blog",
        "Chart Sheet",
        "Code challenges",
        "Docs",
        "Projects",
        "Videos",
        "Workspaces",
    ];
    const Plans = ["Paid memberships", "For students", "Business solutions"];
    const Community = ["Forums", "Chapters", "Events"];
    const Company = ["About", "Carriers", "Affiliates"]

    return (
        <div className="bg-richblack-800">
            <div className="mx-auto flex flex-col gap-8 w-11/12 items-center justify-between max-w-maxContent py-14">
                <div className="border-b w-[100%] row1 flex flex-row pb-5 border-richblack-700">
                    <div className="col1 w-[50%] flex flex-row justify-between border-r border-richblack-700 pl-3 pr-5 gap-3">
                        <div className="1 flex flex-col gap-2 w-[30%] mb-7">
                            <div className="logo">
                                <img src={logo} alt="" className="object-contain" />
                            </div>
                            <div className="company flex flex-col text-white">
                                <h2 className='font-bold text-richblack-50 text-[16px]'>Company</h2>
                                {Company.map((element, index) => {
                                    return (
                                        <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                            <Link to={element.toLowerCase}>{element}</Link>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="icons flex flex-row gap-2 text-richblack-200">
                                <FaFacebook />
                                <FaGoogle />
                                <FaTwitter />
                                <FaYoutube />
                            </div>
                        </div>

                        <div className="2 flex flex-col text-white justify-between w-[30%]">
                            <div className="flex flex-col ">
                                <h2 className='font-bold'>Resources</h2>
                                <Link to={"/articles"}>articles</Link>
                                <Link to={"/blog"}>Blog</Link>
                                <Link to={"/chartSheet"}>ChartSheet</Link>
                            </div>
                            <div className="support">
                                <h2 className='font-bold'>Support</h2>
                                <Link to={"/helpCenter"}>Help Center</Link>
                            </div>
                        </div>


                        <div className="3 flex flex-col text-white justify-between gap-5">
                            <div className="plans flex flex-col">
                                <h2 className='font-bold'> Plans</h2>
                                <Link to={"/articles"}>Paid memberships</Link>
                                <Link to={"/blog"}>For students</Link>
                                <Link to={"/chartSheet"}>Business solutions</Link>
                            </div>
                            <div className="community flex flex-col">
                                <h2 className='font-bold'>Community</h2>
                                <Link to={"/articles"}>Forums</Link>
                                <Link to={"/blog"}>Chapters</Link>
                                <Link to={"/chartSheet"}>Events</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col2 w-[50%] flex flex-row justify-between pl-5 gap-3">
                        {FooterLink2.map((ele, i) => {
                            return (
                                <div key={i} className='w-[30%]'>
                                    <h1 className='font-semibold text-[16px] text-richblack-50'>{ele.title}</h1>
                                    <div className="flex flex-col gap-2 mt-2 text-richblack-300">
                                        {ele.links.map((link, index) => {
                                            return (
                                                <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                                    <Link to={link.link}>{link.title}</Link>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="row2 flex-flex-row items-center justify-between mx-auto text-richblack-400 max-w-maxContent">
                    <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
                        <div className="col1 flex flex-row">
                            {BottomFooter.map((element, index) => {
                                return (
                                    <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                        <Link to={`/${element.toLowerCase()}`}>{element}</Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="copyright">
                            Made with ❤️ CodeHelp © 2023 Studynotion
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer