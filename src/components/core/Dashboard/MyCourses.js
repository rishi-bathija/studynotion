import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchInstructorCourses, getAllCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import CourseTable from './InstructorCourses/CourseTable';

const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const fetchCourses = async () => {
        setLoading(true);
        const result = await fetchInstructorCourses(token);
        if (result) {
            console.log('get courses', result);
            setCourses(result);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCourses();
    }, [])
    return (
        <div>
            <div className='flex justify-between'>
                <h1 className='text-white'>My Courses</h1>
                <IconBtn text='Add Course' onClick={() => navigate('/dashboard/add-course')}><FaPlus /></IconBtn>
            </div>
            {courses && <CourseTable courses={courses} setCourses={setCourses} />}
        </div>

    )
}

export default MyCourses
