import React from 'react'
import signupimage from "../assets/Images/signup.webp"
import Template from '../components/core/auth/Template'

const Signup = () => {
    return (
        <Template title={"Join the millions learning to code with StudyNotion for free"}
            desc1={"Build skills for today, tomorrow, and beyond. "}
            desc2={" Education to future-proof your career."}
            image={signupimage}
            formtype="signup"
        />
    )
}

export default Signup
