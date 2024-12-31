import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';

export default function TableExample({ courses, setCourses }) {
    console.log('courses', courses);
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const handleCourseDelete = async (courseId) => {
        setLoading(true);

        await deleteCourse({ courseId: courseId }, token);

        const result = await fetchInstructorCourses(token);

        if (token) {
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    return (
        <div className='text-white'>
            <Table>
                <Thead>
                    <Tr className='flex gap-x-10 border-richblack-800 p-8'>
                        <Th>Courses</Th>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {courses.length > 0 ? (
                        courses.map((course) => {
                            return (
                                <Tr key={course._id} className='flex gap-x-10 border-richblack-800 p-8'>
                                    <Td className='flex gap-x-4'>
                                        <img src={course?.thumbnail} alt={course?.courseName}
                                            className='h-[150px] w-[220px] rounded-lg object-cover' />
                                        <div className='flex flex-col'>
                                            <p>{course?.courseName}</p>
                                            <p>{course?.courseDescription}</p>
                                            <p>Created</p>
                                            {course?.status === COURSE_STATUS.DRAFT ? (
                                                <p className='text-pink-50'>DRAFTED</p>
                                            ) : (
                                                <p className='text-yellow-50'>PUBLISHED</p>
                                            )}
                                        </div>
                                    </Td>
                                    <Td>2hr 30min</Td>
                                    <Td>${course.price}</Td>
                                    <Td>
                                        <button onClick={() => { console.log('courseId', course._id); navigate(`/dashboard/edit-course/${course._id}`) }} disabled={loading} className='mr-[18px]'>EDIT</button>
                                        <button disabled={loading} onClick={() =>
                                            setConfirmationModal({
                                                text1: 'Do you want to delete this course?',
                                                text2: 'All data of this course would be deleted',
                                                btn1Text: 'Delete',
                                                btn2Text: 'Cancel',
                                                btn1Handler: () => handleCourseDelete(course._id),
                                                btn2Handler: () => setConfirmationModal(null),
                                            })}>DELETE</button>
                                    </Td>
                                </Tr>
                            );
                        })
                    ) : (
                        <Tr>
                            <Td colSpan="4">No Courses found</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
}
