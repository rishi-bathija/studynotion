import React from 'react'
import HighlightText from './HighlightText'
import HTMLImage from "../../../assets/Images/Know_your_progress.png"
import comparePage from "../../../assets/Images/Compare_with_others.png"
import calenderPage from "../../../assets/Images/Plan_your_lessons.png"
import Buttons from './Buttons'

const LearningSection = () => {
    return (
        <div className="flex flex-col gap-10 my-20">
            <div className="flex flex-col justify-center items-center gap-5">
                <h2 className="heading text-4xl font-semibold">Your swiss knife for <HighlightText text={"learning any language"} /></h2>
                <p className="text-center text-base font-semibold text-richblack-700">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>
            <div className="images flex flex-row justify-center items-center relative">
                <img className="-mr-32" src={HTMLImage} alt="" />
                <img src={comparePage} alt="" />
                <img className="-ml-32" src={calenderPage} alt="" />
            </div>
            <div className="btn flex justify-center">
                <Buttons active={true} linkto={"/signup"}>
                    Learn More
                </Buttons>
            </div>
        </div>
    )
}

export default LearningSection
