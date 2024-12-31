import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setSignUpData } from '../../../slice/authSlice';
import { sendotp } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    // In JavaScript, when you want to use a variable or a dynamic key as a property name within an object literal, you need to use square brackets [].
    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const signupData = {
            ...formData,
            accountType,
        }
        console.log("Printing signup data", signupData);

        dispatch(setSignUpData(signupData));
        dispatch(sendotp(formData.email, navigate));
        // reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }


    return (
        <div className="mt-6 w-full flex flex-col gap-y-5">
            <div className="flex bg-richblack-800 p-1 rounded-full gap-x-1 w-max">
                <button onClick={() => setAccountType("Student")} className={`${accountType === "Student" ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} rounded-full py-2 px-5 transition-all duration-200`}>Student</button>
                <button onClick={() => setAccountType("Instructor")} className={`${accountType === "Instructor" ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} rounded-full py-2 px-5 transition-all duration-200`}>Instructor</button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row md:gap-x-5">
                    <label className="flex flex-col mb-3">
                        <p className="text-richblack-100 mb-1 relative">First Name<sup className='text-center text-richblack-100 text-xs' style={{
                            paddingLeft: '4px',
                            fontSize: '16px',
                            position: 'absolute',
                            top: '2px'
                        }}>*</sup></p>
                        <input
                            required
                            type="text"
                            onChange={changeHandler}
                            value={formData.firstName}
                            placeholder="Enter First Name"
                            name="firstName"
                            className="border border-pure-greys-200 rounded-md p-2 w-full text-richblack-700"
                        />
                    </label>

                    <label className="flex flex-col mb-3">
                        <p className="text-richblack-100 mb-1 relative">Last Name<sup className='text-center text-richblack-100 text-xs' style={{
                            paddingLeft: '4px',
                            fontSize: '16px',
                            position: 'absolute',
                            top: '2px'
                        }}>*</sup></p>
                        <input
                            required
                            type="text"
                            onChange={changeHandler}
                            value={formData.lastName}
                            placeholder="Enter Last Name"
                            name="lastName"
                            className="border border-pure-greys-200 rounded-md p-2 w-full pr-5 text-richblack-700"
                        />
                    </label>
                </div>

                <label className="flex flex-col mb-3">
                    <p className="text-richblack-100 mb-1 relative">Email Address<sup className='text-center text-richblack-100 text-xs' style={{
                        paddingLeft: '4px',
                        fontSize: '16px',
                        position: 'absolute',
                        top: '2px'
                    }}>*</sup></p>
                    <input
                        required
                        type="email"
                        onChange={changeHandler}
                        value={formData.email}
                        placeholder="Enter Email"
                        name="email"
                        className="border border-pure-greys-200 rounded-md p-2 w-full text-richblack-700"
                    />
                </label>

                <div className="flex flex-col md:flex-row md:gap-x-5">
                    <label className="flex flex-col mb-3 relative">
                        <p className="text-richblack-100 mb-1 relative">Password<sup className='text-center text-richblack-100 text-xs' style={{
                            paddingLeft: '4px',
                            fontSize: '16px',
                            position: 'absolute',
                            top: '2px'
                        }}>*</sup></p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            onChange={changeHandler}
                            value={formData.password}
                            placeholder="Enter Password"
                            name="password"
                            className="border border-pure-greys-200 rounded-md p-2 pr-10 w-full relative text-richblack-700"
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)} className='absolute top-10 right-2 text-xl cursor-pointer'>
                            {showPassword ? <AiOutlineEyeInvisible className="text-richblack-100" /> : <AiOutlineEye className="text-richblack-100" />}
                        </span>
                    </label>

                    <label className="flex flex-col mb-3 relative">
                        <p className="text-richblack-100 mb-1 relative">Confirm Password<sup className='text-center text-richblack-100 text-xs' style={{
                            paddingLeft: '4px',
                            fontSize: '16px',
                            position: 'absolute',
                            top: '2px'
                        }}>*</sup></p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            onChange={changeHandler}
                            value={formData.confirmPassword}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className="border border-pure-greys-200 rounded-md p-2 pr-10 w-full relative text-richblack-700"
                        />
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)} className='absolute top-10 right-2 text-xl cursor-pointer'>
                            {showConfirmPassword ? <AiOutlineEyeInvisible className="text-richblack-100" /> : <AiOutlineEye className="text-richblack-100" />}
                        </span>
                    </label>
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full my-5">Create Account</button>
            </form>
        </div>
    )
}

export default SignUpForm