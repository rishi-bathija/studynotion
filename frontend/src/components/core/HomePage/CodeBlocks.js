import React from 'react';
import Buttons from './Buttons';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({ direction, heading, subheading, btn1, btn2, codeblock, bgGradient, codeColor }) => {
    return (
        <div className={`flex ${direction} gap-10 justify-between flex-col`}>
            {/* Container 1 */}
            <div className="container w-[100%] lg:w-[50%] flex flex-col gap-8 leading-[1.5]">
                {heading}
                {/* Subheading */}
                <div className="font-bold text-richblack-300 -mt-3 leading-[1.5]">{subheading}</div>
                {/* Buttons */}
                <div className="flex flex-row gap-7">
                    <Buttons linkto={btn1.link} active={btn1.active}>
                        <div className="flex items-center gap-2">
                            {btn1.btnText}
                            <FaArrowRight />
                        </div>
                    </Buttons>
                    <Buttons linkto={btn2.link} active={btn2.active}>
                        {btn2.btnText}
                    </Buttons>
                </div>
            </div>

            {/* Container-2 */}
            <div className={`h-fit flex text-[15px] sm:text-sm leading-[1.5] w-[100%] lg:w-[490px] py-3 ${bgGradient}`}>
                {/* Indexes */}
                <div className="text-center flex flex-col select-none w-[10%] text-richblack-400 font-bold font-inter">
                    {Array.from({ length: 12 }, (_, index) => (
                        <p key={index + 1}>{index + 1}</p>
                    ))}
                </div>

                {/* Code */}
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation
                        sequence={[codeblock, 1000, '']}
                        cursor={true}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        style={{
                            whiteSpace: 'pre-line',
                            display: 'block',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;
