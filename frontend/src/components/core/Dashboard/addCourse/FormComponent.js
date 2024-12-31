import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInfoForm from './courseInfo/CourseInfoForm';
import CourseBuilderForm from './courseBuilder/CourseBuilderForm';
import PublishCourseForm from './publishCourse/PublishCourseForm';

const FormComponent = () => {
    const step = useSelector((state => state.course.step));

    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        }
    ];

    return (
        <>
            <div className='flex items-center justify-center mb-8'>
                {steps.map((item, index) => (
                    <div key={item.id} className='flex items-center'>
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${step === item.id ? "bg-richblack-900 text-yellow-50 border-yellow-50" : "bg-richblack-700 text-richblack-300 border-richblack-800"}`}>
                            {step > item.id ? (<FaCheck />) : (item.id)}
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`h-2 w-28 border-dashed border-b-2 ${step > item.id ? "border-yellow-50" : "border-richblack-500"}`}></div>
                        )}
                    </div>
                ))}
            </div>
            <div className='flex justify-around mb-8'>
                {steps.map((item) => (
                    <div key={item.id} className='text-center'>
                        <p className={`text-lg font-semibold ${step === item.id ? "text-yellow-50" : "text-richblack-300"}`}>{item.title}</p>
                    </div>
                ))}
            </div>
            <div className='p-8 bg-richblack-800 rounded-lg shadow-lg'>
                {step === 1 && <CourseInfoForm />}
                {step === 2 && <CourseBuilderForm />}
                {step === 3 && <PublishCourseForm />}
            </div>
        </>
    );
};

export default FormComponent;
