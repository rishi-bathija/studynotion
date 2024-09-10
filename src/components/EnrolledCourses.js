import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();
    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token, dispatch);
            setEnrolledCourses(response);
            console.log("Enrolled Courses", enrolledCourses);

        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, [token]);

    return (
        <div className='text-white p-6 bg-gray-900 min-h-screen'>
            <h1 className='text-3xl font-bold mb-6'>Enrolled Courses</h1>
            {!enrolledCourses ? (
                <div className='text-center'>Loading...</div>
            ) : !enrolledCourses.length ? (
                <p className='text-center'>You haven't enrolled in any course</p>
            ) : (
                <div>
                    <div className='grid grid-cols-3 gap-6 mb-4 font-semibold'>
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {enrolledCourses.map((course, index) => (

                        <div key={index} className='grid grid-cols-3 gap-6 mb-6 p-4 bg-gray-800 rounded-lg'>
                            <div className='flex items-center' onClick={() => navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}>
                                <img src={course.thumbnail} alt="" className='w-16 h-16 rounded mr-4' />
                                <div>
                                    <p className='font-bold text-lg'>{course.courseName}</p>
                                    <p className='text-sm text-gray-400'>{course.courseDescription}</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <p>{course.totalDuration}</p>
                            </div>
                            <div className='flex flex-col justify-center'>
                                <p className='mb-2'>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}
                                    bgColor='#4caf50'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;
