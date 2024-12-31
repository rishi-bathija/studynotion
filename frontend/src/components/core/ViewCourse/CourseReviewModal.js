import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'  // Updated icon for close
import { useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { useForm } from 'react-hook-form'
import IconBtn from '../../common/IconBtn'
import { createRating } from '../../../services/operations/courseDetailsAPI'

const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating)
    }

    const onSubmit = async (data) => {
        await createRating({
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience,
        }, token);

        setReviewModal(false);
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm bg-black'>
            <div className='bg-richblack-800 p-6 rounded-md w-[400px]'>
                {/* Modal Header */}
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold text-white'>Add Review</h2>
                    <FaTimes className='text-white cursor-pointer' onClick={() => setReviewModal(false)} />
                </div>

                {/* User Information */}
                <div className='flex items-center gap-4 mb-6'>
                    <img
                        src={user?.image}
                        alt="user"
                        className='w-12 h-12 rounded-full object-cover'
                    />
                    <div className='text-white'>
                        <p className='font-medium'>{user.firstName} {user.lastName}</p>
                        <p className='text-sm text-richblack-300'>Posting Publicly</p>
                    </div>
                </div>

                {/* Review Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Rating Stars */}
                    <div className='mb-6'>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={32}
                            activeColor="#ffd700"
                        />
                    </div>

                    {/* Experience Textarea */}
                    <div className='mb-6'>
                        <label htmlFor="courseExperience" className='text-richblack-300 mb-2 block'>
                            Add Your Experience
                        </label>
                        <textarea
                            id="courseExperience"
                            placeholder='Share your experience here...'
                            {...register("courseExperience", { required: true })}
                            className='w-full p-3 text-white bg-richblack-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[130px]'
                        />
                        {errors.courseExperience && (
                            <span className='text-red-500 text-sm'>Please add your experience</span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className='flex justify-end gap-4'>
                        <button
                            type="button"
                            onClick={() => setReviewModal(false)}
                            className='py-2 px-4 bg-richblack-500 text-white rounded-md hover:bg-richblack-600 transition'
                        >
                            Cancel
                        </button>
                        <IconBtn text="Save" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseReviewModal;
