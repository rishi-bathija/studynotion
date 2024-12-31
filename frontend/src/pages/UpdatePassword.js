import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { resetPassword } from '../services/operations/authAPI';



const UpdatePassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [formData, setformData] = useState({
        password: "",
        confirmPassword: "",
    })

    const { password, confirmPassword } = formData;

    const handleChange = (event) => {
        setformData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value,
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        console.log('location', location.pathname);

        dispatch(resetPassword(password, confirmPassword, token));
    }
    return (
        <div className='text-white'>
            {loading ? (
                <div>
                    Loading...
                </div>) : (
                <div>
                    <h1>
                        Choose new password
                    </h1>
                    <p>
                        Almost done. Enter your new password and youre all set.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>New Password<sup>*</sup></p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name='password'
                                onChange={handleChange}
                                value={password}
                                placeholder='New Password'
                                className='text-black'
                            />
                            <span onClick={() => setshowPassword((prev) => !prev)}>{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</span>
                        </label>

                        <label>
                            <p>Confirm Password<sup>*</sup></p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                onChange={handleChange}
                                value={confirmPassword}
                                placeholder='Confirm Password'
                                className='text-black'
                            />
                            <span onClick={() => setshowConfirmPassword((prev) => !prev)}>{showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</span>
                        </label>

                        <button type='submit'>Reset Pasword</button>
                    </form>
                    <div>
                        <Link to={"/login"}>
                            <p>Back to Login</p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdatePassword
