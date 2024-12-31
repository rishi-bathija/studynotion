import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slice/courseSlice';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../courseInfo/Upload';
import IconBtn from '../../../../common/IconBtn';


const SubSectionModal = ({ modalData, setModalData, add = false, edit = false, view = false }) => {
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const course = useSelector((state) => state.course.course);

    useEffect(() => {
        if (view || edit) {
            setValue('lectureTitle', modalData.title);
            setValue('lectureDesc', modalData.description);
            setValue('lectureVideo', modalData.videoUrl);
        }
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues.lectureTitle !== modalData.title || currentValues.lectureDesc !== modalData.description || currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append('sectionId', modalData.sectionId);
        formData.append('subSectionId', modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append('title', currentValues.lectureTitle);
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append('description', currentValues.lectureDesc);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append('video', currentValues.lectureVideo);
        }

        setLoading(true);

        const result = await updateSubSection(formData, token);
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            );

            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async (data) => {
        if (view) return;

        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made in the form");
            }
            else {
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append('sectionId', modalData);
        formData.append('title', data.lectureTitle);
        formData.append('description', data.lectureDesc);
        formData.append('video', data.lectureVideo);

        const result = await createSubSection(formData, token);
        if (result) {
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            );

            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);

    }

    return (
        <div>
            <div>
                <p>{view ? "Viewing" : edit ? "Editing" : add ? "Adding" : ""} Lecture</p>
                <button onClick={() => { !loading && setModalData(null) }}>
                    <RxCross1 />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload name='lectureVideo'
                    label='Lecture Video'
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null} />
                <div>
                    <label htmlFor="lectureTitle">Lecture Title</label>
                    <input id="lectureTitle" placeholder='Enter Lecture Title' {...register('lectureTitle', { required: true })}
                        className='w-full text-black' />
                    {errors.lectureTitle && <span>Lecture Title is required</span>}
                </div>
                <div>
                    <label htmlFor="lectureDesc">Lecture Description</label>
                    <textarea id="lectureDesc" placeholder='Enter Lecture Description' {...register('lectureDesc', { required: true })}
                        className='w-full text-black' />
                    {errors.lectureDesc && <span>Lecture Description is required</span>}
                </div>

                {!view && (
                    <div>
                        <IconBtn text={edit ? "Save changes" : "Save"} />
                    </div>
                )}
            </form>
        </div>
    )
}

export default SubSectionModal
