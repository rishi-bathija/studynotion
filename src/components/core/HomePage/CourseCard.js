import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    return (
        <div className={`h-[300px] w-[360px] ${currentCard === cardData?.heading
            ? "bg-white shadow-[10px_10px]"
            : "bg-richblack-800"} text-richblack-25 box-border cursor-pointer`} onClick={() => setCurrentCard(cardData?.heading)}>

            <div className={`flex flex-col gap-10 p-5 border-b-[2px] border-richblack-400 border-dashed h-[80%]`}>

                <div className={`heading text-lg font-bold ${currentCard === cardData?.heading && "text-richblack-800"
                    }`}>
                    {cardData?.heading}
                </div>
                <div className="subheading text-richblack-400">
                    {cardData?.description}
                </div>
            </div>
            <div className={`down flex justify-between ${currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
                } py-4 px-3`}>

                <div className="flex flex-row gap-2 items-center">
                    <HiUsers />
                    {cardData?.level}
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <ImTree />
                    {cardData?.lessonNumber} Lesson
                </div>
            </div>
        </div>
    )
}

export default CourseCard
