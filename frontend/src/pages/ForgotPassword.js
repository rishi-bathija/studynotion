import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getResetPasswordToken } from "../services/operations/authAPI"


const ForgotPassword = () => {
    const { loading } = useSelector((state) => state.auth)
    const [emailSent, setemailSent] = useState(false);
    const [email, setemail] = useState("");

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getResetPasswordToken(email, setemailSent));
    }
    return (
        <div cclassName="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {!emailSent ? "Reset Your Password" : "Check Your Email"
                            }
                        </h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            {!emailSent ?
                                "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                                `We have sent the reset link to ${email}`}
                        </p>

                        <form onSubmit={handleSubmit}>
                            {!emailSent && (
                                <label className='w-full'>
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address</p>
                                    <input
                                        required
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        name='email'
                                        onChange={(e) => setemail(e.target.value)}
                                        className='text-richblack-700 w-full' />

                                </label>
                            )}
                            <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                {!emailSent ? "Reset Password" : "Resend Email"}
                            </button>
                        </form>
                        <div className="mt-6 flex items-center justify-between">
                            <Link to={"/login"}>
                                <p className="flex items-center gap-x-2 text-richblack-5">Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword
