import ImgLogin from "../../components/img-login/ImgLogin.jsx";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

function Login() {

    const location = useLocation();
    const successMessage = location.state?.successMessage;
    const [ loginData, setLoginData ] = useState({
        username: "",
        password: ""
    })

    async function postUserLogin() {
        try {
            console.log(loginData)
            console.log("trying!!!")
            const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', loginData)
            console.log(result)
            const jwtToken = result.data.accessToken
            localStorage.setItem('jwtToken', jwtToken)
        } catch (e){
            console.log('error', e)
        }

    }

    function handleSubmit(e) {
        e.preventDefault()

        !loginData.username || !loginData.password
            ? alert("please fill in all fields")
            : postUserLogin()
    }

    function handleOnChange(e) {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }


    return(
            <section className="login-card">
                <div className='image-wrap-login'>
                    <ImgLogin/>
                </div>


                <div className='login-form-wrap'>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className='register-login-form'>Don't have an account? <a className='register-login-form-link' href='/register'>Register here</a></p>
                    {successMessage ? <p className='succesfull-message'>Registration successful! Please login</p> : <h2>Login</h2>}

                    <form className='login-form'  onSubmit={handleSubmit}>
                        <input type="text" id="username" name="username"  placeholder="username" onChange={handleOnChange}/>
                        <input type="password" id="password" name="password" placeholder="password" onChange={handleOnChange}/>
                        <button type="submit">Sign in</button>
                    </form>
                </div>



            </section>


    )
}

export default Login