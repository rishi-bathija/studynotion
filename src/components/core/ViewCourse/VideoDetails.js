import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slice/viewCourseSlice';
import { Player } from 'video-react';
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from '../../common/IconBtn';

const VideoDetails = () => {
    const { courseSectionData, courseEntireData, completedLectures } =
        useSelector((state) => state.viewCourse);
    const { token } = useSelector((state) => state.auth)
    const { courseId, sectionId, subSectionId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const playerRef = useRef(null);

    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    // show the video associated with the courseId, sectionUd, subSectionId provided in params on the first render 
    useEffect(() => {
        const getCurrentVideo = () => {
            if (!courseSectionData?.length) return;

            if (!courseId && !sectionId && !subSectionId) {
                navigate(`/dashboard/enrolled-courses`);
            }
            else {
                const filteredData = courseSectionData?.filter((section) => section._id === sectionId);

                console.log('filtereddata', filteredData);

                const filteredVideoData = filteredData?.[0]?.subSection?.filter((subsection) => subsection._id === subSectionId);
                setVideoData(filteredVideoData[0]);
                console.log("videodata", videoData);

            }
        }
        getCurrentVideo();
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        // if current section and current subsection  
        const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);

        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);

        const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);

        if (currentSectionIndex === courseSectionData?.length - 1 && currentSubSectionIndex === noOfSubSections - 1) {
            return true;
        }
        else {
            return false;
        }
    }

    const goToNextVideo = () => {
        // 2 cases:
        // 1) next video is in the next section, i.e, current video(subsection) is last of current lecture(section)
        // 2) next video is in the same section, i.e, current video isn't the last video of current lecture, and just play next video

        const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);

        const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);

        if (currentSubSectionIndex !== noOfSubSections - 1) {
            const nextSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex + 1]._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        else {
            const nextSectionId = courseSectionData?.[currentSectionIndex + 1]._id;

            const nextSubSectionId = courseSectionData?.[currentSectionIndex + 1]?.subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        }
    }

    const goToPreviousVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex((section) => section._id === sectionId);

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((subsection) => subsection._id === subSectionId);

        if (currentSubSectionIndex !== 0) {
            const prevSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        }
        else {
            const prevSectionId = courseSectionData?.[currentSectionIndex - 1]._id;

            const prevSubSectionLength =
                courseSectionData?.[currentSectionIndex - 1]?.subSection.length

            const prevSubSectionId = courseSectionData?.[currentSectionIndex - 1]?.subSection[prevSubSectionLength - 1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
        }
    }

    const handleLectureCompletion = async () => {
        setLoading(true);
        const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);

        if (res) {
            dispatch(updateCompletedLectures(subSectionId))
        }

        setLoading(false);
    }

    console.log('videourl', videoData?.videoUrl);
    return (
        <div className='text-white'>
            {!videoData ? (<p>No data found</p>) : (
                <Player ref={playerRef} aspectRatio='16:9'
                    playsInline
                    onEnded={() => setVideoEnded(true)}
                    src={videoData?.videoUrl}>
                    <AiFillPlayCircle />

                    {
                        videoEnded && (
                            <div>
                                {
                                    !completedLectures.includes(subSectionId) && (
                                        <IconBtn disabled={loading}
                                            onClick={() => handleLectureCompletion()}
                                            text={!loading ? "Mark as completed" : "Loading..."} />
                                    )
                                }

                                <IconBtn
                                    disabled={loading}
                                    onClick={() => {
                                        if (playerRef.current) {
                                            playerRef.current.seek(0);
                                            setVideoEnded(false);
                                        }
                                    }} text="Rewatch" customClasses="text-xl" />

                                <div>
                                    {!isFirstVideo() && (
                                        <button disabled={loading}
                                            onClick={goToPreviousVideo} className='text-white bg-richblack-600'>Prev</button>
                                    )}
                                    {!isLastVideo() && (
                                        <button disabled={loading} onClick={goToNextVideo} className='text-white bg-richblack-600'>Next</button>
                                    )}
                                </div>
                            </div>

                        )
                    }
                </Player>

            )}
            <h1>{videoData?.title}</h1>
            <p>{videoData?.description}</p>
        </div>
    )
}

export default VideoDetails
