import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../services/operations/authAPI'


const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;
    const changeHandler = (event) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        // dispatch(login(email, password, navigate));
        login(email, password, navigate, dispatch);
    }

    return (
        <form onSubmit={handleOnSubmit} className='mt-6 w-full flex flex-col gap-y-5'>
            <label>
                <p className='mb-1 text-sm text-richblack-100 relative'>Email Address<sup className='text-center text-richblack-100 text-xs' style={{
                    paddingLeft: '4px',
                    fontSize: '16px',
                    position: 'absolute',
                    top: '1px'
                }}>*</sup></p>
                <input
                    required
                    type="email"
                    value={formData.email} onChange={changeHandler}
                    placeholder='Enter Email id'
                    name='email' className='border border-pure-greys-200 rounded-md p-2 w-full text-richblack-800' />
            </label>

            <label className='relative'>
                <p className='text-richblack-100 relative'>Password<sup className='text-center text-richblack-100 text-xs' style={{
                    paddingLeft: '4px',
                    fontSize: '16px',
                    position: 'absolute',
                    top: '2px'
                }}>*</sup></p>

                <div className='relative'>
                    <input
                        required
                        type={showPassword ? ("text") : ("password")}
                        value={formData.password} onChange={changeHandler}
                        placeholder='Enter Password'
                        name='password' className='border border-pure-greys-200 rounded-md p-2 pr-10 w-full text-richblack-700' />

                    <span onClick={() => setShowPassword((prev) => !prev)} className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer'>
                        {showPassword ? (<AiOutlineEyeInvisible className='text-pure-greys-500' />) : (<AiOutlineEye className='text-pure-greys-500' />)}
                    </span>
                </div>

                <Link to="/forgot-password" className='text-blue-100'>
                    <p className='absolute right-0 text-sm my-1'>
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button type='submit' className='bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 my-5'>Sign In</button>
        </form>
    )
}

export default LoginForm
