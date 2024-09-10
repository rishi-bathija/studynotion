import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from "../../utils/constants"
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/api'
import { BsChevronDown } from 'react-icons/bs'

const Navbar = () => {
    const location = useLocation();

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    // if the path provided by link matches the route 
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    const [subLinks, setSubLinks] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing sublink result", result);
            setSubLinks(result?.data?.data);
            console.log("subLinks", subLinks);
        } catch (error) {
            console.log("Cant fetch category list", error);
        }
    }
    useEffect(() => {
        fetchSubLinks();
    }, [])

    useEffect(() => {
        console.log("subLinks", subLinks);
    }, [subLinks]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className="h-14 flex items-center justify-center border-b-[1px] border-b-richblack-700">
            <div className="w-11/12 max-w-maxContent flex items-center justify-between">
                <div className="image">
                    <Link to={"/"}>
                        <img src={logo} width={160} height={42} loading="lazy" />
                    </Link>
                </div>
                <div className="flex items-center lg:hidden">
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                    </button>
                </div>
                <div className={`list ${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row lg:gap-x-6 text-richblack-25`}>
                    <nav>
                        <ul className="flex flex-col lg:flex-row gap-x-6 gap-y-2 lg:gap-y-0">
                            {NavbarLinks.map((element, index) => (
                                <li key={index}>
                                    {element.title === "Catalog" ? (
                                        <div className='relative flex cursor-pointer items-center gap-1 group'>
                                            <p>{element.title}</p>
                                            <BsChevronDown />
                                            <div className="invisible absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[20%] z-[1000] rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[330px] flex flex-col p-3">
                                                <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 bg-richblack-5"></div>
                                                {(subLinks && subLinks.length > 0) ? (
                                                    <>
                                                        {
                                                            subLinks?.filter(
                                                                (subLink) => subLink?.courses?.length > 0
                                                            )?.map((sublink, i) => (
                                                                <Link to={`/catalog/${sublink.name.split(" ").join("-").toLowerCase()}`} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" key={i}>
                                                                    <p>{sublink?.name}</p>
                                                                </Link>
                                                            ))
                                                        }
                                                    </>

                                                ) : (
                                                    <p className='text-center'>No courses found</p>
                                                )}
                                            </div>
                                        </div>) : (
                                        <Link to={element?.path}>
                                            <p className={`${matchRoute(element?.path) ? "text-yellow-25" : "text-richblack-25"}`}>{element.title}</p>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="auth flex gap-x-4 items-center">
                    {
                        user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link to={"dashboard/cart"} className="relative">
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-100 mx-2'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md text-richblack-100 mx-2'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropDown />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
