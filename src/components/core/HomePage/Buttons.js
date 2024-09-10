import React from 'react'
import { Link } from 'react-router-dom'

const Buttons = ({ linkto, children, active }) => {
    return (
        <Link to={linkto}>
            <div className={`${active ? "bg-yellow-50 text-black" : "bg-richblack-800"} px-6 py-4 rounded-md font-bold shadow-[2px_2px_2px_0px_rgba(255,255,2555,0.2)] hover:shadow-none hover:scale-95 transition-all duration-200`}>
                {children}
            </div>
        </Link>
    )
}

export default Buttons
