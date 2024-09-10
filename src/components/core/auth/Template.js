import React from 'react'
import frame from '../../../assets/Images/frame.png'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import { FcGoogle } from "react-icons/fc"
const Template = ({ title, desc1, desc2, image, formtype }) => {
    console.log(formtype);
    return (
        <div className="text-richblack-25 flex flex-row justify-between gap-10 w-11/12 max-w-maxContent mx-auto py-12">
            <div className='w-[50%] max-w-[450px] mx-0'>
                <h1 className='text-3xl font-semibold leading-10 text-richblack-5'>{title}</h1>
                <p className='mt-4 text-lg'>
                    <span className='text-richblack-100'>{desc1}</span>
                    <span className='text-blue-100 font-bold font-edu-sa italic'>{desc2}</span>
                </p>

                {formtype === "signup" ? (<SignUpForm />) : (<LoginForm />)}

                <div className='flex w-full items-center gap-2 my-5 text-richblack-300'>
                    <div className='h-[1px] w-full bg-richblack-300'></div>
                    <p>OR</p>
                    <div className='h-[1px] w-full bg-richblack-300'></div>
                </div>

                <button className='bg-richblack-700 px-3 py-2 flex gap-2 items-center justify-center mx-auto w-full'>
                    <FcGoogle />
                    <p>Sign up with Google</p>
                </button>
            </div>

            <div className='relative w-[50%] max-w-[450px] mx-0'>
                <img src={frame} width={558} height={504} loading="lazy" alt="pattern" />
                <img src={image} width={558} height={504} loading="lazy" alt="students" className='absolute -top-5 -left-5' />
            </div>
        </div>
    )
}

export default Template
