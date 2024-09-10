import React from 'react'

const HighlightText = ({ text }) => {
    return (
        <span className="bg-gradient-to-b from-richblue-100 via-richblue-300 to-caribbeangreen-100 text-transparent font-bold bg-clip-text">
            {" "}
            {text}
        </span>
    )
}

export default HighlightText
