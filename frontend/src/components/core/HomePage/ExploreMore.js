import React, { useState } from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from '../../../data/homepage-explore'
import CourseCard from './CourseCard'

const ExploreMore = () => {
    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths",
    ]

    const [currentTab, setCurrentTab] = useState(tabsName[0]); /* Free */
    const [courses, setCourses] = useState(HomePageExplore[0].courses) /*html-heading,desc,lno,level */;
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading); /* learn html */

    const setCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.find((course) => course.tag === value);

        if (result) {
            setCourses(result.courses);
            setCurrentCard(result.courses[0].heading);
        } else {
            // Handle the case where no matching tag is found
            console.error(`No matching tag found for ${value}`);
        }
    };

    return (
        <div>

            <div className="font-semibold text-4xl text-center">Unlock the <HighlightText text={"Power of Code"} /></div>

            <p className="text-center font-bold text-richblack-300 leading-[1.5] mt-2">Learn to Build Anything You Can Imagine</p>

            <div className='flex flex-row items-center gap-5 my-10 p-[4px_4px] bg-richblack-800 rounded-full mx-auto w-max shadow-[0px_1px_rgba(255,255,255,0.5)]'>
                {
                    tabsName.map((element, index) => {
                        return (
                            <div className={`text-lg px-5 py-[7px] rounded-full ${element === currentTab ? "bg-richblack-900 text-white font-medium" : "text-richblack-200"} cursor-pointer transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5`} key={index} onClick={() => setCards(element)}>
                                {element}
                            </div>
                        )
                    })
                }
            </div>

            <div className="h-[200px]"></div>

            <div className="my-14 absolute flex flex-row gap-10 justify-between w-full left-[50%] bottom-[0] lg:translate-x-[-50%] lg:translate-y-[50%] z-10">
                {courses.map((element, index) => (
                    <CourseCard key={index} cardData={element}
                        currentCard={currentCard} setCurrentCard={setCurrentCard} />
                ))}
            </div>
        </div>
    )
}

export default ExploreMore
