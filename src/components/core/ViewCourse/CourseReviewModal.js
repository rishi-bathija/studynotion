import React, { useEffect } from 'react'
import { FaCross } from 'react-icons/fa'
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
        <div className='flex flex-col w-[350px]'>
            <div className='flex justify-between text-white bg-richblack-500'>
                <p>Add Review</p>
                <FaCross onClick={() => setReviewModal(false)} />
            </div>
            <div className='bg-richblack-800'>
                <div>
                    <img src={user?.image} alt="user image" className='aspect-square w-[50px] object-cover rounded-full' />
                    <div>
                        <p>{user.firstName}{user.lastName}</p>
                        <p>Posting Publicly</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReactStars count={5} onChange={ratingChanged} size={24} activeColor="#ffd700" />

                    <div>
                        <label htmlFor="courseExperience">
                            Add Your Experience
                        </label>
                        <textarea id="courseExperience" placeholder='Add Your Experience here'
                            {...register("courseExperience", { required: true })} className='w-full min-h-[130px]' />
                        {errors.courseExperience && (
                            <span>
                                Please add your experience
                            </span>
                        )}
                    </div>

                    <div>
                        <button onClick={() => setReviewModal(false)}>Cancel</button>
                        <IconBtn text={"Save"} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CourseReviewModal
