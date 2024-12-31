import React from 'react';
import HighlightText from '../../HomePage/HighlightText';
import Buttons from '../../HomePage/Buttons';

const LearningGrid = () => {
    const LearningGridArray = [
        {
            order: -1,
            heading: "World-Class Learning for",
            highlightText: "Anyone, Anywhere",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText: "Learn More",
            BtnLink: "/",
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description:
                "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring effective learning strategies.",
        },
        {
            order: 3,
            heading: "Certification",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to provide industry-recognized certifications.",
        },
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description:
                "Our advanced auto-grading system ensures accurate assessment of your skills and learning progress.",
        },
        {
            order: 5,
            heading: "Ready to Work",
            description:
                "Prepare for the workforce with industry-aligned skills and certifications through our expert-designed programs.",
        },
    ];

    return (
        <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 gap-6 max-w-maxContent">
            {LearningGridArray.map((item, index) => (
                <div
                    key={index}
                    className={`p-6 rounded-lg ${index === 0
                        ? "lg:col-span-2 bg-richblack-900"
                        : item.order % 2 === 1
                            ? "bg-richblack-700"
                            : "bg-richblack-800"
                        } ${item.order === 3 && "lg:col-start-2"}`}
                >
                    {item.order < 0 ? (
                        <div>
                            <div className="text-3xl font-bold text-yellow-50 mb-4">
                                {item.heading} <HighlightText text={item.highlightText} />
                            </div>
                            <p className="text-richblue-200 mb-4">{item.description}</p>
                            <Buttons active={true} linkto={item.BtnLink}>
                                {item.BtnText}
                            </Buttons>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-2xl font-semibold text-yellow-200 mb-2">
                                {item.heading}
                            </h1>
                            <p className="text-richblue-100">{item.description}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LearningGrid;
