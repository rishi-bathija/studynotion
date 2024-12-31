import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructor = () => {
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const instructorCourses = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if (instructorApiData.length) {
                setInstructorData(instructorApiData);
            }

            if (instructorCourses) {
                setCourses(instructorCourses);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmtGenrated, 0);
    console.log();

    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    return (
        <div className='flex flex-col'>
            <div className='text-white flex flex-col'>
                <h1>Hi {user?.firstName}!</h1>
                <p>Let's start something new!</p>
            </div>
            {loading ? (<div className='spinner'></div>) : courses.length > 0 ? (
                <div className='text-white'>
                    <div>
                        <div className='flex'>
                            {totalAmount > 0 || totalStudents > 0 ? (<InstructorChart courses={instructorData} />) : (<div>
                                <p>Visualize</p>
                                <p>Not enough data to visualize</p>
                            </div>)}
                            <div>
                                <h2>Statistics</h2>
                                <div>
                                    <p>TotalCourses</p>
                                    <p>{courses.length}</p>
                                </div>

                                <div>
                                    <p>Total Students</p>
                                    <p>{totalStudents}</p>
                                </div>

                                <div>
                                    <p>Total Income</p>
                                    <p>{totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <p>Your Courses</p>
                            <Link to="/dashboard/my-courses">View All</Link>
                        </div>
                        <div className='flex'>
                            {courses.slice(0, 3).map((course, index) => (
                                <div className='flex flex-col' key={index}>
                                    <img src={course.thumbnail} alt="" />
                                    <div className='flex flex-col'>
                                        <p>{course.courseName}</p>
                                        <div className='flex'>
                                            <p>{course.studentsEnrolled.length}</p>
                                            <p>|</p>
                                            <p>Rs {course.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>) : (<div>
                    <p>You haven't created any courses yet</p>
                    <Link to="/dashboard/add-course">Create a course</Link>
                </div>)}
        </div>
    )
}

export default Instructor
