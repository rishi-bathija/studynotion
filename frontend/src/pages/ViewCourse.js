import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { getFullCourseDetails } from '../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setCompletedlectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slice/viewCourseSlice';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const getFullCourse = async () => {
            const fullCourseData = await getFullCourseDetails(courseId, token);

            dispatch(setCourseSectionData(fullCourseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(fullCourseData.courseDetails));
            dispatch(setCompletedlectures(fullCourseData.completedVideos));

            let lectures = 0;
            fullCourseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length;
            })

            dispatch(setTotalNoOfLectures(lectures));
        }
        getFullCourse();
    }, [])

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900'>
            {/* Sidebar */}
            <VideoDetailsSidebar setReviewModal={setReviewModal} />

            {/* Main Content */}
            <div className='flex-1 h-[calc(100vh-3.5rem)] overflow-auto'>
                <div className='mx-6'>
                    <Outlet />
                </div>
            </div>

            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </div>
    )
}

export default ViewCourse;
