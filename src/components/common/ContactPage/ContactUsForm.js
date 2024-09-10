import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiConnector';
import CountryCode from "../../../data/countrycode.json";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: '',
                firstName: '',
                lastName: '',
                message: '',
                phoneNumber: '',
            });
        }
    }, [reset, isSubmitSuccessful]);

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            setLoading(true);
            // const response = await apiConnector("POST", contactUsEndpoint.CONTACT_US_API, data);
            const response = { status: 'OK' };
            console.log('response', response);

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <form
            className="p-8 rounded-lg bg-richblack-800 shadow-lg space-y-6 text-yellow-100 max-w-lg mx-auto"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="firstName" className="font-semibold text-sm">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter first name"
                        className="p-3 rounded-lg bg-richblack-900 text-white border border-richblack-700 focus:border-yellow-500 outline-none"
                        {...register('firstName', { required: true })}
                    />
                    {errors.firstName && (
                        <p className="text-red-400 text-xs">Please enter your first name</p>
                    )}
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="lastName" className="font-semibold text-sm">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter last name"
                        className="p-3 rounded-lg bg-richblack-900 text-white border border-richblack-700 focus:border-yellow-500 outline-none"
                        {...register('lastName')}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-semibold text-sm">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    className="p-3 rounded-lg bg-richblack-900 text-white border border-richblack-700 focus:border-yellow-500 outline-none"
                    {...register('email', { required: true })}
                />
                {errors.email && (
                    <p className="text-red-400 text-xs">Please enter your email address</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="phoneNumber" className="font-semibold text-sm">Phone Number</label>
                <div className="flex gap-3">
                    <select
                        name="countrycode"
                        id="countrycode"
                        {...register('countrycode', { required: true })}
                        className="p-3 rounded-lg bg-richblack-900 text-white border border-richblack-700 focus:border-yellow-500 outline-none w-[81px]"
                    >
                        {CountryCode.map((element, index) => (
                            <option key={index}>{element.code} - {element.country}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Enter phone number"
                        className="flex-1 p-3 rounded-lg bg-richblack-900 text-white border border-richblack-700 focus:border-yellow-500 outline-none w-[calc(100%-90px)] "
                        {...register('phoneNumber', {
                            required: { value: true, message: 'Please enter phone number' },
                            maxLength: { value: 10, message: 'Invalid phone number' },
                            minLength: { value: 8, message: 'Invalid phone number' },
                        })}
                    />
                </div>
                {errors.phoneNumber && (
                    <p className="text-red-400 text-xs">{errors.phoneNumber.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="message" className="font-semibold text-sm">Message</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    rows="5"
                    className="p-3 rounded-lg bg-richblack-900 text-white border border-richblack-700 focus:border-yellow-500 outline-none"
                    {...register('message', { required: true })}
                ></textarea>
                {errors.message && (
                    <p className="text-red-400 text-xs">Please enter your message</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-3 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition-colors"
                disabled={loading}
            >
                Send Message
            </button>
        </form>
    );
};

export default ContactUsForm;
