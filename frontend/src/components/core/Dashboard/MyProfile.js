import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className='text-white mx-auto flex flex-col gap-8 p-6 bg-richblack-900 rounded-lg max-w-4xl'>
            <h1 className='text-3xl font-bold mb-6'>My Profile</h1>

            <div className='flex justify-between items-center mb-6 bg-richblack-800 rounded-lg px-5 py-3'>
                <div className='flex items-center gap-4'>
                    <img
                        src={user?.image}
                        alt={user?.firstName}
                        className='rounded-full w-20 h-20 object-cover'
                    />
                    <div>
                        <p className='text-xl font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                        <p className='text-richblack-400'>{user?.email}</p>
                    </div>
                </div>
                <IconBtn
                    text="Edit"
                    onClick={() => {
                        navigate("/dashboard/settings");
                    }}
                >
                    <RiEditBoxLine />
                </IconBtn>
            </div>

            <div className='flex flex-col mb-6 rounded-lg bg-richblack-800 px-5 py-3'>
                <div className='flex justify-between items-center mb-2'>
                    <p className='text-xl font-semibold'>About</p>
                    <IconBtn
                        text={"Edit"}
                        onClick={() => {
                            navigate("/dashboard/settings");
                        }}
                    >
                        <RiEditBoxLine />
                    </IconBtn>
                </div>
                <p className='text-richblack-400'>
                    {user?.additionalDetails?.about ? user?.additionalDetails?.about : "Write something about yourself"}
                </p>
            </div>

            <div className='flex flex-col rounded-lg bg-richblack-800 px-5 py-3'>
                <div className='flex justify-between items-center mb-2'>
                    <p className='text-xl font-semibold'>Personal Details</p>
                    <IconBtn
                        text={"Edit"}
                        onClick={() => {
                            navigate("/dashboard/settings");
                        }}
                    >
                        <RiEditBoxLine />
                    </IconBtn>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p className='text-richblack-400'>First Name</p>
                            <p>{user?.firstName}</p>
                        </div>
                        <div>
                            <p className='text-richblack-400'>Email</p>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <p className='text-richblack-400'>Gender</p>
                            <p>{user?.additionalDetails?.gender ? user?.additionalDetails?.gender : "Add Gender"}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <p className='text-richblack-400'>Last Name</p>
                            <p>{user?.lastName}</p>
                        </div>
                        <div>
                            <p className='text-richblack-400'>Contact</p>
                            <p>{user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : "Add Contact Number"}</p>
                        </div>
                        <div>
                            <p className='text-richblack-400'>Date of Birth</p>
                            <p>{user?.additionalDetails?.dateOfBirth ? user?.additionalDetails?.dateOfBirth : "Add Date of Birth"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
