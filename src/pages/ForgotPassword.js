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
        <div className='text-white'>
            {
                loading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div>
                        <h1>
                            {!emailSent ? "Reset Your Password" : "Check Your Email"
                            }
                        </h1>
                        <p>
                            {!emailSent ?
                                "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                                `We have sent the reset link to ${email}`}
                        </p>

                        <form onSubmit={handleSubmit}>
                            {!emailSent && (
                                <label>
                                    <p>Email Address</p>
                                    <input
                                        required
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        name='email'
                                        onChange={(e) => setemail(e.target.value)}
                                        className='text-richblack-700' />

                                </label>
                            )}
                            <button>
                                {!emailSent ? "Reset Password" : "Resend Email"}
                            </button>
                        </form>
                        <div>
                            <Link to={"/login"}>
                                <p>Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword
