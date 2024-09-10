import React from 'react';
import ContactUsForm from '../../../common/ContactPage/ContactUsForm';

const ContactFormSection = () => {
    return (
        <div className="mx-auto text-center py-12 max-w-maxContent">
            <h1 className="text-3xl font-bold text-yellow-50 mb-4">Get in Touch</h1>
            <p className="text-richblue-200 mb-8">
                We'd love to hear from you. Please fill out this form.
            </p>
            <div className="bg-richblack-800 p-8 rounded-lg">
                <ContactUsForm />
            </div>
        </div>
    );
};

export default ContactFormSection;
