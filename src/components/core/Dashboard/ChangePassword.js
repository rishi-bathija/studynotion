import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { GiSpawnNode } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../services/operations/settingsAPI';
import IconBtn from '../../common/IconBtn';

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [showOldPassword, setshowOldPassword] = useState(false);
    const [showNewPassword, setshowNewPassword] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)

    const onSubmit = async (data) => {
        try {
            await changePassword(token, data, dispatch)
            console.log('password submitted with data:', data);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 bg-richblack-800 px-10 py-8 border-[1px] border-richblack-700 rounded-md my-10 justify-center'>
                <h2 className='font-bold text-xl mb-5'>Password</h2>
                <div className='flex flex-col gap-2 lg:flex-row'>
                    <div className='flex flex-col gap-2 lg:w-[50%] relative'>
                        <label htmlFor="oldPassword" className='text-richblack-50'>Current Password</label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Enter Current Password"
                                className='text-white bg-richblack-600 p-3 w-full'
                                {...register("oldPassword", { required: "Please enter your Current Password." })}
                            />
                            <span
                                onClick={() => { setshowOldPassword(prev => !prev) }}
                                className='absolute right-3 top-3 cursor-pointer text-white'>
                                {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                        {errors.oldPassword && <span>{errors.oldPassword.message}</span>}
                    </div>
                    <div className='flex flex-col gap-2 lg:w-[50%] relative'>
                        <label htmlFor="newPassword" className='text-richblack-50'>New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter New Password"
                                className='text-white bg-richblack-600 p-3 w-full'
                                {...register("newPassword", { required: "Please enter your new Password." })}
                            />
                            <span
                                onClick={() => { setshowNewPassword(prev => !prev) }}
                                className='absolute right-3 top-3 cursor-pointer text-white'>
                                {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </span>
                        </div>
                        {errors.newPassword && <span>{errors.newPassword.message}</span>}
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-5">
                    <IconBtn type="submit" text="Submit" />
                </div>
            </form>
        </div>
    )
}

export default ChangePassword
