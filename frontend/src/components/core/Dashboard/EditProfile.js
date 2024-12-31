import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../services/operations/settingsAPI';
import IconBtn from '../../common/IconBtn';


const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);


    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // Handle form submission
        try {
            updateProfile(token, data, dispatch);
            console.log('Form submitted with data:', data);
        } catch (error) {
            console.log("Error", error.message)
        }
        // Reset the form after submission
        // reset();
    };

    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2 bg-richblack-800 px-10 py-8 border-[1px] border-richblack-700 rounded-md my-10 justify-center'>
                    <h2 className='font-bold text-xl mb-5'>Profile Information</h2>
                    <div className='flex flex-row gap-x-2'>
                        <div className='flex flex-col gap-2 lg:w-[50%]'>
                            <label htmlFor="firstName" className='text-richblack-50'>First Name</label>
                            <input
                                type="text"
                                placeholder='Enter First Name'
                                {...register('firstName', { required: true })}
                                defaultValue={user?.firstName}
                                className='text-white bg-richblack-600 p-3' />
                            {errors.firstName && <span>This field is required</span>}

                            <label htmlFor="dateOfBirth" className='text-richblack-50'>Date of Birth</label>
                            <input
                                type="date"
                                {...register('dateOfBirth', {
                                    required: {
                                        value: true,
                                        message: "Please enter your date of birth"
                                    },
                                    // indicates the max value of date cannot be greater than current date
                                    max: {
                                        // For example, if you have a string like "2024-04-22T08:30:00Z", splitting it at "T" would result in an array with two elements: "2024-04-22" and "08:30:00Z". The "T" itself is not included in either of the resulting substrings; it's used solely as a delimiter.
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be of the future"
                                    }
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                                className='text-white bg-richblack-600 p-3' />
                            {errors.dateOfBirth && <span>{errors.dateOfBirth.message}</span>}

                            <label htmlFor="contactNumber" className='text-richblack-50'>Contact Number</label>
                            <input
                                type="tel"
                                placeholder='Enter Contact Number'
                                {...register('contactNumber', {
                                    required: {
                                        value: true,
                                        message: "Please enter your Contact Number."
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Invalid Contact Number"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Invalid Contact Number",
                                    }
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                                className='text-white bg-richblack-600 p-3' />
                            {errors.contactNumber && <span> {errors.contactNumber.message}</span>}
                        </div>
                        <div className='flex flex-col gap-2 w-[50%]'>
                            <label htmlFor="lastName" className='text-richblack-50'>Last Name</label>
                            <input
                                type="text"
                                placeholder='Enter Last Name'
                                {...register('lastName', { required: true })}
                                defaultValue={user?.lastName}
                                className='text-white bg-richblack-600 p-3' />
                            {errors.lastName && <span>This field is required</span>}

                            <label htmlFor="gender" className='text-richblack-50'>Gender</label>
                            <select
                                type="text"
                                {...register('gender', {
                                    required: true
                                })}
                                defaultValue={user?.additionalDetails?.gender}
                                className='text-white py-[14.5px] bg-richblack-600 px-3'>
                                {genders.map((element, index) => {
                                    return (
                                        <option key={index} value={element}>{element}</option>
                                    )
                                })}
                            </select>
                            {errors.gender && <span>{errors.gender.message}</span>}

                            <label htmlFor="about" className='text-richblack-50'>About</label>
                            <input
                                type="text"
                                placeholder='Enter something about yourself'
                                {...register('about', {
                                    required: true
                                })}
                                defaultValue={user?.additionalDetails?.about}
                                className='text-white bg-richblack-600 p-3' />
                            {errors.about && <span> {errors.about.message}</span>}
                        </div>
                    </div>
                </div>


                {/* <input type="password" {...register('password', { required: true })} />
                {errors.password && <span>This field is required</span>} */}

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </div>
    );
};

export default EditProfile;