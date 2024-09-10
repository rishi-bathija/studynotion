import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../slice/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourseForm = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = useSelector((state) => state.course.course);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (course.status === COURSE_STATUS.PUBLISHED) {
      setValue('public', true);
    }
  }, [])

  const goToCourses = () => {
    dispatch(resetCourseState());
    // navigate('/dashboard/my-courses');
  }

  const onSubmit = async () => {

    // checking if there is no updation in the form, so do noting and show the already made coursses
    if ((course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true) || (course.status === COURSE_STATUS.DRAFT && getValues('public') === false)) {
      goToCourses();
      return;
    }

    // if form is updated
    const formData = new FormData();
    formData.append('courseId', course._id);
    const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append('status', courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }
    setLoading(false);
  }

  const goBack = () => {
    dispatch(setStep(2));
  }

  return (
    <div>
      <h1>Publish Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-3'>
        <div className='flex gap-x-2 items-center'>
          <label htmlFor="public">
            Make this course as public
          </label>
          <input type="checkbox" id='public'
            {...register('public')}
            className='rounded h-4 w-4 flex' />
        </div>

        <div className='flex justify-end gap-x-3'>
          <button type='button' disabled={loading} onClick={goBack} className='flex items-center rounded-md bg-richblack-300 px-4 py-2'>Back</button>
          <IconBtn disabled={loading} text='Save Changes' />
        </div>
      </form>
    </div>
  )
}

export default PublishCourseForm

