import ImgLogin from "../../components/img-login/ImgLogin.jsx";
import {useLocation} from "react-router-dom";

function Login() {

    const location = useLocation();
    const successMessage = location.state?.successMessage;


    return(
            <section className="login-card">
                <div className='image-wrap-login'>
                    <ImgLogin/>
                </div>


                <div className='login-form-wrap'>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className='register-login-form'>Don't have an account? <a className='register-login-form-link' href='/register'>Register here</a></p>
                    {successMessage && <p className='succesfull-message'>Registration successful!</p>}
                    <h2>Login</h2>
                    <form className='login-form'>
                        <input type="text" id="username" name="username"  placeholder="username" />
                        <input type="password" id="password" name="password" placeholder="password"/>
                        <button type="submit">Sign in</button>
                    </form>
                </div>



            </section>


    )
}

export default Login