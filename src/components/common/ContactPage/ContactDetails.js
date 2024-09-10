import React from 'react'
import * as Icon1 from "react-icons/bi"
import * as Icon2 from "react-icons/hi2"
import * as Icon3 from "react-icons/io5"

const ContactDetails = () => {
    const contactDetails = [
        {
            icon: "HiChatBubbleLeftRight",
            heading: "Chat on us",
            description: "Our friendly team is here to help.",
            details: "info@studynotion.com",
        },
        {
            icon: "BiWorld",
            heading: "Visit us",
            description: "Come and say hello at our office HQ.",
            details:
                "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        },
        {
            icon: "IoCall",
            heading: "Call us",
            description: "Mon - Fri From 8am to 5pm",
            details: "+123 456 7869",
        },
    ]
    return (
        <div className='flex flex-col gap-6 bg-richblack-800 p-6'>
            {contactDetails.map((item, index) => {
                let Icon = Icon1[item.icon] || Icon2[item.icon] || Icon3[item.icon]
                return (
                    <div className='flex flex-col gap-[2px]' key={index}>
                        <div className='flex items-center gap-3'>
                            <Icon size={25} />
                            <h1>{item.heading}</h1>
                        </div>
                        <p>{item.description}</p>
                        <p>{item.details}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ContactDetails
