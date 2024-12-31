import React from 'react'
import ContactUsForm from '../components/common/ContactPage/ContactUsForm'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'
import ContactDetails from '../components/common/ContactPage/ContactDetails'

const Contact = () => {
    return (
        <div>
            <div className='flex mx-auto justify-between mt-20 text-white w-11/12 gap-10'>
                <div className='w-[40%]'><ContactDetails /></div>
                <div className='w-[60%]'><ContactUsForm /></div>
            </div>
            <div className='my-20 flex flex-col justify-between text-white w-11/12 items-center'>
                <h1>Review from other learners</h1>
                <ReviewSlider />
            </div>
            <Footer />
        </div>
    )
}

export default Contact
