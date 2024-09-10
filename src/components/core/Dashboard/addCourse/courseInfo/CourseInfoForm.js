import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slice/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { MdNavigateNext } from 'react-icons/md';

const CourseInfoForm = () => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const { course, editCourse } = useSelector(state => state.course);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const step = useSelector(state => state.course.step);
    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);

            const categories = await fetchCourseCategories();

            if (categories.length > 0) {
                setCategory(categories);
            }

            setLoading(false);
        };

        if (editCourse && course) {
            setValue('courseTitle', course.courseName);
            setValue('courseShortDesc', course.courseDescription);
            setValue('coursePrice', course.price);
            setValue('courseTags', course.tag);
            setValue('courseBenefits', course.whatYouWillLearn);
            setValue('courseCategory', course.category);
            setValue('courseRequirements', course.instructions);
            setValue('courseImage', course.thumbnail);
        }

        getCategories();
    }, [editCourse, course, setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ) {
            return true;
        }
        return false;
    }

    const onSubmit = async (data) => {
        console.log("Form submitted with data:", data);

        if (editCourse) {
            console.log("Editing course...");
            if (isFormUpdated()) {
                const currentValues = getValues();

                const formData = new FormData();
                formData.append('courseId', course._id);

                if (currentValues.courseTitle !== course.courseName) {
                    formData.append('courseName', data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append('courseDescription', data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(data.courseRequirements)
                    )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                console.log("Edit result:", result);
                setLoading(false);

                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                } else {
                    toast.error("No changes made to the form");
                }
                return;
            }
        }

        const formData = new FormData();
        formData.append('courseName', data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnailImage", data.courseImage);
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        console.log("Add result:", result);
        if (result) {
            console.log("step", step);
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
            <div>
                <label htmlFor="courseTitle">Course Title<sup>*</sup></label>
                <input
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register('courseTitle', { required: true })}
                    className='w-full text-black'
                />
                {errors.courseTitle && <span>Course Title is required</span>}
            </div>
            <div>
                <label htmlFor="courseShortDesc">Course Short Description<sup>*</sup></label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter Description'
                    {...register('courseShortDesc', { required: true })}
                    className='w-full text-black min-h-[140px]'
                />
                {errors.courseShortDesc && <span>Course Description is required</span>}
            </div>
            <div>
                <label htmlFor="coursePrice">Course Price<sup>*</sup></label>
                <div className='relative'>
                    <HiOutlineCurrencyRupee className='absolute bottom-[10px] left-3 text-richblack-400 text-xl' />
                    <input
                        id='coursePrice'
                        placeholder='Enter Course Price'
                        {...register('coursePrice', { required: true })}
                        className='w-full text-black'
                    />
                </div>
                {errors.coursePrice && <span>Course Price is required</span>}
            </div>

            <div className="flex flex-col space-y-2">
                <label className="text-sm text-richblack-5" htmlFor="courseCategory">
                    Course Category <sup className="text-pink-200">*</sup>
                </label>
                <select
                    {...register("courseCategory", { required: true })}
                    defaultValue=""
                    id="courseCategory"
                    className="form-style w-full"
                >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {!loading &&
                        category?.map((category, indx) => (
                            <option key={indx} value={category?._id}>
                                {category?.name}
                            </option>
                        ))}
                </select>
                {errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course Category is required
                    </span>
                )}
            </div>

            <ChipInput
                label='Tags'
                name='courseTags'
                placeholder='Enter Tags and press Enter'
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />
            <Upload
                name='courseImage'
                label='Course Thumbnail'
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />
            <div>
                <label htmlFor="courseBenifits">Course Benefits<sup>*</sup></label>
                <textarea
                    id='courseBenifits'
                    placeholder='Enter Course Benefits'
                    {...register('courseBenefits', { required: true })}
                    className='w-full text-black min-h-[130px]'
                />
                {errors.courseBenefits && <span>Course Benefits are required</span>}
            </div>

            <RequirementField
                name='courseRequirements'
                label='Requirements / Instructions'
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <div>
                {editCourse && (
                    <button onClick={() => dispatch(setStep(2))}
                        disabled={loading} className='flex items-center gap-x-2 bg-richblack-300'> Continue Without Saving</button>
                )}
                <IconBtn disabled={loading} text={!editCourse ? 'Next' : 'Save Changes'} onClick={() => console.log("clicked")}>
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </form>
    );
};

export default CourseInfoForm;
