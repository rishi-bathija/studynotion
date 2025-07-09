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
            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>
                <ReviewSlider />
            </div>
            <Footer />
        </div>
    )
}

export default Contact
