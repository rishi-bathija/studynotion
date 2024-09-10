import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import FormComponent from '../addCourse/FormComponent';
import { setCourse, setEditCourse } from '../../../../slice/courseSlice';
import { getFullCourseDetails } from '../../../../services/operations/courseDetailsAPI';

const EditCourse = () => {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);

            const result = await getFullCourseDetails(courseId, token);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className='text-white'>
            <h1>Edit Course</h1>
            <div>
                {
                    course ? (<FormComponent />) : (<p>Course not found</p>)
                }
            </div>
        </div>
    )
}

export default EditCourse
