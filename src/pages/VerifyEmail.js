import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { sendotp, signup } from '../services/operations/authAPI';
import OTPInput from 'react-otp-input';



const VerifyEmail = () => {
    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setotp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();

        const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;

        dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }
    return (
        <div>
            {loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className='text-white'>
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to your mail.Enter it below</p>
                    <form onSubmit={handleSubmit}>
                        <OTPInput
                            value={otp}
                            onChange={setotp}
                            numInputs={6}
                            renderInput={(props) => <input {...props} className='text-black' />} />
                        <button type='submit'>Verify Email</button>
                    </form>
                    <div>
                        <div>
                            <Link to={"/login"}>
                                <p>Back to Login</p>
                            </Link>
                        </div>

                        <button onClick={() => dispatch(sendotp(signupData.email, navigate))}>
                            Resend it
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VerifyEmail



