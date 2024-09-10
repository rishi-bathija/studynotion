import React from 'react'
import { logout } from '../../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

const ProfileDropDown = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnClick = () => {
        logout(navigate, dispatch);
    }


    return (
        <>
            <div className='text-white bg-pure-greys-400 px-4 py-2 cursor-pointer' onClick={() => { navigate("/dashboard/my-profile") }}>
                Dashboard
            </div>
            <div className='text-white bg-pure-greys-400 px-4 py-2 cursor-pointer' onClick={handleOnClick}>
                Logout
            </div>
        </>
    )
}

export default ProfileDropDown
