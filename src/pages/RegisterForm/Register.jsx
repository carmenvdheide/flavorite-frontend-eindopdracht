import React from "react"
import ImgLogin from "../../components/img-login/ImgLogin.jsx";
import './Register.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";





function Register() {

    const navigate = useNavigate()

    const [ registerResult, setRegisterResult ] = useState({})

    const [ registerData, setRegisterData ] = useState({
        username: "",
        email: "",
        password: "",
        role: ["user"]
    })

    async function postUserData() {
        try {
            console.log("trying!!!")
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',  registerData)
            console.log(result)
            setRegisterResult(result)
        } catch (e) {
            console.log('error', e)

        }
    }

    function handleOnChange(e) {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()


        !registerData.username || !registerData.email || !registerData.password
            ? alert("please fill in all fields")
            : registerData.password.length<6
                ? alert("password has to be at least 6 characters")
            : !registerData.email.includes("@")
                    ? alert("email doesn't include @")
                    : document.getElementById("password").value !== document.getElementById("confirm-password").value
                        ? alert("passwords are different")
                        : postUserData()
    }

    useEffect(() => {
        registerResult.status === 200 && navigate('/login', { state: { successMessage: 'Registration successful! Please log in.' } })
    }, [registerResult]);

    return  (



            <section className="register-card">
                <div className='image-wrap-login'>
                    <ImgLogin/>
                </div>


                <div className='register-form-wrap'>
                     {/*eslint-disable-next-line react/no-unescaped-entities */}
                    <p className='register-login-form'>Go back to <a className='register-login-form-link' href='/login'>login page</a></p>
                    <h2>Create account</h2>

                    <form className='register-form' onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={handleOnChange}/>

                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id="email" name="email" onChange={handleOnChange}/>

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={handleOnChange}/>

                        <label htmlFor="confirm-password">Confirm password:</label>
                        <input type="password" id="confirm-password" name="password" />

                        <button type="submit" >Register</button>
                    </form>

                </div>


            </section>

        )

}
export default Register