import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { useSelector } from 'react-redux';
import { BsChevronDown } from "react-icons/bs"
const VideoDetailsSidebar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const { sectionId, subSectionId } = useParams();

    const { courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures } = useSelector((state) => state.viewCourse);


    useEffect(() => {
        const setActiveFlags = () => {
            if (!courseSectionData.length) return;

            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((data) => data?._id === subSectionId);

            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);

            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <>
            <div className='text-white flex flex-col'>
                {/* for buttons and heading */}
                <div className='flex justify-between'>
                    {/* for buttons */}
                    <div onClick={() => navigate("/dashboard/enrolled-courses")}>
                        Back
                    </div>
                    <div><IconBtn text="Add Review" onClick={() => setReviewModal(true)} /></div>
                </div>
                {/* for heading and title */}
                <div>
                    <p>{courseEntireData.courseName}</p>
                    <p>{completedLectures.length}/{totalNoOfLectures}</p>
                </div>
            </div>
            {/* for section and subsections */}
            <div className='text-white'>
                {courseSectionData.map((section, index) => (
                    <div onClick={() => setActiveStatus(section._id)} key={index}>
                        {/* section */}
                        <div className='flex justify-between'>
                            <p>
                                {section?.sectionName}
                            </p>
                            <span className={`${activeStatus === section.sectionName ? "rotate-0" : "rotate-100"} transition-all duration-500`}><BsChevronDown /></span>
                        </div>
                        {/* subsections */}
                        <div>
                            {activeStatus === section._id && (
                                <div>
                                    {section.subSection.map((subsection, index) => (
                                        <div className={`flex gap-2 ${subsection._id === videoBarActive ? "bg-yellow-200 text-richblack-900" : "text-white bg-richblack-900"}`} key={index} onClick={() => { navigate(`/view-course/${courseEntireData._id}/section/${sectionId}/sub-section/${subSectionId}`); setVideoBarActive(subsection._id) }}>
                                            <input type='checkbox' checked={completedLectures.includes(subsection._id)} onChange={() => { }} />
                                            <span>{subsection.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default VideoDetailsSidebar
