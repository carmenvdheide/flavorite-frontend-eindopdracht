import ImgLogin from "../../components/img-login/ImgLogin.jsx";

function Login() {
    return(
        <>
            <section className="login-card">
                <div className='image-wrap-login'>
                    <ImgLogin/>
                </div>

                <div className='login-form-wrap'>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className='register-login-form'>Don't have an account? <a className='register-login-form-link' href='/register'>Register here</a></p>
                    <h2>Login</h2>
                    <form className='login-form'>
                        <input type="text" id="username" name="username"  placeholder="username" />
                        <input type="password" id="password" name="password" placeholder="password"/>
                        <button type="submit">Sign in</button>
                    </form>
                </div>

            </section>

        </>
    )
}

export default Login