import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
}) => {
    const { editCourse, course } = useSelector((state) => state.course);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (editCourse && Array.isArray(course?.tag)) {
            setTags(course.tag);
        }
        register(name, { required: true, validate: (value) => value.length > 0 });
    }, [editCourse, course, name, register]);

    useEffect(() => {
        setValue(name, tags);
    }, [tags, setValue, name]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();

            // get the input value and remove leading/trailing spaces
            console.log('tagvalue', e.target.value);
            const tagValue = e.target.value.trim();
            if (tagValue && !tags.includes(tagValue)) {
                const newTags = [...tags, tagValue];
                setTags(newTags);
                e.target.value = "";
            }
        }
    };

    const handleDelete = (i) => {
        const newTags = tags.filter((_, index) => index !== i);
        setTags(newTags);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>

            {/* Render the chips and input */}
            <div className='flex flex-wrap gap-2 w-full'>
                {/* tags with delete button*/}
                {tags.map((tag, index) => (
                    <div key={index} className='flex items-center bg-yellow-400 rounded-full px-2 py-1'>
                        {tag}
                        <button type='button' className="ml-2 focus:outline-none"
                            onClick={() => handleDelete(index)}>
                            <MdClose className='text-sm' />
                        </button>
                    </div>
                ))}
                <input id={name} name={name} type='text' placeholder={placeholder} onKeyDown={handleKeyDown} className="form-style w-full text-black" />
            </div>
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    );
};

export default ChipInput;
