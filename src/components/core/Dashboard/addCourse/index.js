import React from 'react';
import FormComponent from './FormComponent';

const AddCourse = () => {
    return (
        <div className='text-white flex flex-col md:flex-row gap-8 p-8 bg-gray-900'>
            <div className='flex-1'>
                <h1 className='text-3xl font-bold mb-6'>Add Course</h1>
                <FormComponent />
            </div>
            <div className='flex-1 bg-gray-800 p-6 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-semibold mb-4'>Course Upload Tips</h2>
                <ul className='list-disc list-inside space-y-2 text-gray-300'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    );
};

export default AddCourse;
