import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { useSelector } from 'react-redux';
import { BsChevronDown } from "react-icons/bs"

const VideoDetailsSidebar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState(""); // Initially closed
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const { sectionId, subSectionId } = useParams();
    const { courseSectionData, courseEntireData, completedLectures, totalNoOfLectures } = useSelector((state) => state.viewCourse);

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
        <div className='text-white flex flex-col w-1/4 bg-richblack-800 p-4'>
            {/* Header */}
            <div className='flex justify-between items-center mb-6'>
                <div className='text-sm text-yellow-500 cursor-pointer' onClick={() => navigate("/dashboard/enrolled-courses")}>
                    Back
                </div>
                <IconBtn text="Add Review" onClick={() => setReviewModal(true)} />
            </div>

            {/* Course Info */}
            <div className='mb-8'>
                <p className='text-lg font-semibold'>{courseEntireData.courseName}</p>
                <p className='text-sm text-gray-400'>{completedLectures.length}/{totalNoOfLectures} Lectures Completed</p>
            </div>

            {/* Sections and Subsections */}
            <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                {courseSectionData.map((section, index) => (
                    <div key={index} className='mt-2 cursor-pointer text-sm text-richblack-5 mb-4' onClick={() => setActiveStatus(activeStatus === section._id ? "" : section._id)}>
                        {/* Section */}
                        <div className='flex justify-between items-center px-5 py-4 bg-richblack-600'>
                            <p className='font-semibold'>{section?.sectionName}</p>
                            <BsChevronDown
                                className={`transition-transform duration-500 ${activeStatus === section._id ? 'rotate-180' : 'rotate-0'}`}
                            />
                        </div>

                        {/* Subsections */}
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${activeStatus === section._id ? 'max-h-screen' : 'max-h-0'}`}>
                            {section.subSection.map((subsection, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-2 p-2 cursor-pointer ${subsection._id === videoBarActive ? 'bg-yellow-300 text-richblack-900' : 'bg-richblack-900 text-white'}`}
                                    onClick={() => {
                                        navigate(`/view-course/${courseEntireData._id}/section/${section?._id}/sub-section/${subsection?._id}`);
                                        setVideoBarActive(subsection._id);
                                    }}
                                >
                                    <input type='checkbox' checked={completedLectures.includes(subsection._id)} onChange={() => { }} />
                                    <span>{subsection.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideoDetailsSidebar;
