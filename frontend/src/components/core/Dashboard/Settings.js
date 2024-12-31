import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { updateDisplayPicture } from '../../../services/operations/settingsAPI';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import { FiUpload } from 'react-icons/fi';



const Settings = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const fileInputRef = useRef();


    const handleClick = () => {
        fileInputRef.current.click();
        console.log(fileInputRef.current);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            previewFile(file);
        }
    }


    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            console.log("Preview file", reader.result);
        }
    }


    const handleFileUpload = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", imageFile);
            console.log("formdata", formData);
            await updateDisplayPicture(token, formData, dispatch);
            setLoading(false);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile);
        }
    }, [imageFile]);

    return (
        <div className='text-white'>
            <h1 className='font-bold text-3xl mb-14'>Update profile</h1>
            <div className='flex flex-col gap-5'>
                <div className='flex bg-richblack-800 px-5 py-3 gap-2 text-richblack-5 rounded-md'>
                    <img src={previewSource || user.image} alt={user.firstName} className='aspect-square object-cover w-[80px] rounded-full' />
                    <div className='space-y-2'>
                        <p>Change Profile Picture</p>
                        <div className='flex gap-2'>
                            <input
                                type="file"
                                accept='image/png, image/gif, image/jpeg'
                                ref={fileInputRef}
                                className='hidden'
                                onChange={handleFileChange} />
                            <button
                                onClick={handleClick} className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'>
                                Select
                            </button>
                            <IconBtn text={loading ? "Uploading..." : "Upload"} onClick={handleFileUpload}
                            > {!loading && (
                                <FiUpload className="text-lg text-richblack-900" />
                            )} </IconBtn>
                        </div>
                    </div>
                </div>
                <EditProfile />
                <ChangePassword />
                <div></div>
            </div>
        </div>
    )
}

export default Settings
