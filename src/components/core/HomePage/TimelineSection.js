import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import img from "../../../assets/Images/TimelineImage.png"

const TimelineSection = () => {
    const timeline = [
        {
            logo: Logo1,
            heading: "Leadership",
            description: "Fully committed to the success company",
        },
        {
            logo: Logo2,
            heading: "Responsibility",
            description: "Students will always be our top priority",
        },
        {
            logo: Logo3,
            heading: "Flexibility",
            description: "The ability to switch is an important skills",
        },
        {
            logo: Logo4,
            heading: "Solve the problem",
            description: "Code your way to a solution",
        }
    ]
    return (
        <div>
            <div className="flex flex-row gap-15 items-center">
                <div className="left flex flex-col gap-12 w-[45%] mx-10">
                    {timeline.map((element, index) => (
                        <div className="flex flex-row gap-8" key={index}>
                            <div className="image w-[50px] h-[50px] bg-white flex items-center">
                                <img src={element.logo} alt="" />
                            </div>
                            <div className="content">
                                <h2 className="font-semibold text-[18px]">{element.heading}
                                </h2>
                                <p className="text-base">{element.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="right relative shadow-[0px_0px_30px_0px]">
                    <img src={img} alt='timelineImage' className="shadow-white shadow-[20px_20px_0px_0px]" />
                    <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                            <p className='font-bold text-2xl'>10</p>
                            <p className="text-caribbeangreen-300 text-sm">Years of experience</p>
                        </div>

                        <div className='flex flex-row gap-5 items-center px-7'>
                            <p className='font-bold text-2xl'>250</p>
                            <p className="text-caribbeangreen-300 text-sm">Type of courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection
