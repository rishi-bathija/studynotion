// import React from 'react';
// import { useForm } from 'react-hook-form';

// const MyForm = () => {
//     const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

//     const onSubmit = (data) => {
//         // Handle form submission
//         console.log('Form submitted with data:', data);
//         // Reset the form after submission
//         reset();
//     };

//     // Set initial values
//     React.useEffect(() => {
//         setValue('username', 'initialValue');
//         setValue('password', 'initialValue');
//     }, [setValue]);

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
//             <input type="text" {...register('username', { required: true })} />
//             {errors.username && <span>This field is required</span>}

//             <input type="password" {...register('password', { required: true })} />
//             {errors.password && <span>This field is required</span>}

//             <button type="submit" className='text-white'>Submit</button>
//         </form>
//     );
// };

// export default MyForm;


import React, { useState } from 'react';

const useForm = (initialValues, onSubmit) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    };

    const resetForm = () => {
        setValues(initialValues);
    };

    return {
        values,
        handleChange,
        handleSubmit,
        resetForm
    };
};

// Usage
const MyForm = () => {
    const initialValues = {
        username: '',
        password: ''
    };

    const onSubmit = (values) => {
        // Handle form submission
        console.log('Form submitted with values:', values);
    };

    const { values, handleChange, handleSubmit, resetForm } = useForm(initialValues, onSubmit);

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <input type="text" name="username" value={values.username} onChange={handleChange} />
            <input type="password" name="password" value={values.password} onChange={handleChange} />
            <button type="submit" className='text-white'>Submit</button>
            <button type="button" onClick={resetForm} className='text-white'>Reset</button>
        </form>
    );
};

export default MyForm;
