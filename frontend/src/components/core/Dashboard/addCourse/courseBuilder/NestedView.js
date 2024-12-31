import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSolidDownArrow } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slice/courseSlice';
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';

const NestedView = ({ handleEditSectionChange }) => {
    const course = useSelector((state) => state.course.course);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({ sectionId, courseId: course._id }, token);

        if (result) {
            dispatch(setCourse(result));
        }

        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId }, token);

        if (result) {
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            );

            const updatedCourse = { ...course, courseContent: updatedCourseContent };

            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }

    return (
        <>
            <div>
                {course.courseContent.map((section) => (
                    <details key={section._id} open>
                        <summary className='flex items-center justify-between border-b-2 gap-x-3'>
                            <div className='flex gapx-3 items-center'>
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>
                            <div className='flex gap-x-3 item-center'>
                                <button onClick={() => handleEditSectionChange(section.sectionName, section._id)}>
                                    <MdEdit />
                                </button>
                                <button onClick={() => setConfirmationModal({
                                    text1: 'Delete this Section?',
                                    text2: 'All lectures in this section will be deleted',
                                    btn1Text: 'Delete',
                                    btn2Text: 'Cancel',
                                    btn1Handler: () => handleDeleteSection(section._id),
                                    btn2Handler: () => setConfirmationModal(null),
                                })}>
                                    <RiDeleteBin6Line />
                                </button>
                                <span>|</span>
                                <BiSolidDownArrow className='text-xl text-richblack-300' />
                            </div>
                        </summary>
                        <div>
                            {section.subSection.map((data) => (
                                <div key={data?._id} onClick={() => setViewSubSection(data)} className='flex item-senter justify-between gap-x-3'>
                                    <div className='flex items-center gap-x-3'>
                                        <RxDropdownMenu />
                                        <p>{data.title}</p>
                                    </div>
                                    <div className='flex gap-x-3 item-center' onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                            <MdEdit />
                                        </button>
                                        <button onClick={() => setConfirmationModal({
                                            text1: 'Delete this SubSection?',
                                            text2: 'Selected lecture will be deleted',
                                            btn1Text: 'Delete',
                                            btn2Text: 'Cancel',
                                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })}>
                                            <RiDeleteBin6Line />
                                        </button>

                                    </div>
                                </div>
                            ))}
                            <button onClick={() => setAddSubSection(section._id)} className='mt-4 flex items-center gap-x-2 text-yellow-50'>
                                <AiOutlinePlus />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>
            {
                addSubSection ?
                    (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />)
                    : viewSubSection ?
                        (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />)
                        : editSubSection ?
                            (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />)
                            : (<div></div>)
            }

            {confirmationModal ? (<ConfirmationModal modalData={confirmationModal} />) : (<div></div>)}
        </>
    )
}

export default NestedView