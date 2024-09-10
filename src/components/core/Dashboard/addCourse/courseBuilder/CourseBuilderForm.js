import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { MdAddCircleOutline } from 'react-icons/md';
import { BiRightArrow } from 'react-icons/bi';
import { setCourse, setEditCourse, setStep } from '../../../../../slice/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const step = useSelector(state => state.course.step);
    const course = useSelector((state) => state.course.course);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    const [editSection, setEditSection] = useState(null);
    const [loading, setLoading] = useState(false);

    const cancelEdit = () => {
        setEditSection(null);
        setValue('sectionName', '');
    };

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    };

    const goToNext = () => {
        if (course?.courseContent?.length === 0) {
            toast.error("Please add at least one section");
            return;
        }

        if (course?.courseContent?.some((section) => section.subSection.length === 0)) {
            toast.error('Please add at least one lecture in each section');
            return;
        }

        dispatch(setStep(3));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        let result;
        if (editSection) {
            result = await updateSection({ sectionName: data.sectionName, sectionId: editSection, courseId: course._id }, token);
        } else {
            result = await createSection({ sectionName: data.sectionName, courseId: course._id }, token);
        }

        if (result) {
            dispatch(setCourse(result));
            setEditSection(null);
            setValue('sectionName', '');
        }
        setLoading(false);
    };

    const handleEditSectionChange = (sectionName, sectionId) => {
        if (editSection === sectionId) {
            cancelEdit();
            return;
        }

        setEditSection(sectionId);
        setValue("sectionName", sectionName);
    };

    return (
        <div>
            <h1>Course Builder</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="sectionName">Section Name</label>
                    <input id='sectionName'
                        placeholder='Add Section Name'
                        {...register('sectionName', { required: true })}
                        className='w-full text-black'
                    />
                    {errors.sectionName && (
                        <span>Section Name is required</span>
                    )}
                </div>
                <div className='mt-10 flex gap-2'>
                    <IconBtn type="submit" text={editSection ? "Edit Section" : "Create Section"} outline={true} customClasses={"text-white"} ><MdAddCircleOutline /></IconBtn>
                    {editSection && (<button type='button' onClick={cancelEdit} className='text-sm text-richblack-300 underline'>Cancel Edit</button>)}
                </div>
            </form>
            {course?.courseContent?.length > 0 && (
                <NestedView handleEditSectionChange={handleEditSectionChange} />
            )}

            <div className='flex gap-x-2 justify-end mt-10'>
                <button onClick={goBack} className='rounded-md cursor-pointer flex items-center'>Back</button>
                <IconBtn text="Next" onClick={goToNext}><BiRightArrow /></IconBtn>
            </div>
        </div>
    );
};

export default CourseBuilderForm;
