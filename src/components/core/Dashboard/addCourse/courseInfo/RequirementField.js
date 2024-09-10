import React, { useEffect, useState } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirement] = useState('');
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, { required: true, validate: (value) => value.length > 0 });
    }, [register, name]);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList, setValue, name]);

    console.log("req", requirement);
    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement('');
        }
    }

    const handleRemoveRequirement = (index) => {
        setRequirementList(requirementList.filter((_, i) => index !== i));
        // const updatedReqList = [...requirementList];
        // updatedReqList.splice(index,1);
        // setRequirementList(updatedReqList); 
    }

    return (
        <div>
            <label htmlFor={name} >{label}<sup>*</sup></label>
            <div>
                <input
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className='w-full text-black'
                />
                <button type='button' onClick={handleAddRequirement} className='font-semibold text-yellow-50'>
                    Add
                </button>
            </div>

            {requirementList.length > 0 && (
                requirementList.map((req, index) => (
                    <div key={index} className='flex flex-row gap-1'>
                        <span>{req}</span>
                        <button type='button' onClick={() => handleRemoveRequirement(index)} className='font-semibold text-yellow-50'>Remove</button>
                    </div>
                ))
            )}
            {errors[name] && (
                <span>{label} is required</span>
            )}
        </div>
    )
}

export default RequirementField
