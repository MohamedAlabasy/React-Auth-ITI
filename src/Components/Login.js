import { useState } from 'react';

export default function Lab2() {
    let emailPattern = '([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+'
    let phonePattern = '^01[0125][0-9]{8}$'
    const [isLogin, setISLogin] = useState(true);
    const [toHome, setToHome] = useState(false);
    const [togglePassword, setTogglePassword] = useState("fa-solid fa-eye-slash input-group-append input-group-text")
    const [confTogglePassword, setConfTogglePassword] = useState("fa-solid fa-eye-slash input-group-append input-group-text")

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const [loginError, setLoginError] = useState({
        emailError: null,
        passwordError: null,
    });


    const [registrationForm, setRegistrationForm] = useState({
        userName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [registrationError, setRegistrationError] = useState({
        userNameError: "",
        emailError: "",
        phoneError: "",
        passwordError: "",
        confirmPasswordError: ""
    });

    const handelLoginForm = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.id]: e.target.value
        })
        if (e.target.id === 'email') {
            setLoginError({
                ...loginError,
                emailError: e.target.value.length === 0 ? 'This field is required'
                    : !e.target.value.match(emailPattern) ? 'invalid email'
                        : null,
            })
        }
        if (e.target.id === 'password') {
            setLoginError({
                ...loginError,
                passwordError: e.target.value.length === 0 ? 'This field is required'
                    : e.target.value.length <= 8 ? "Your Password Must Contain At Least 8 Characters!"
                        : !(/[A-Z]/.test(e.target.value)) ? "Your Password Must Contain At Least 1 Capital Letter!"
                            : !(/[0-9]/.test(e.target.value)) ? "Your Password Must Contain At Least 1 Number!"
                                : !(/[a-z]/.test(e.target.value)) ? "Your Password Must Contain At Least 1 Lowercase Letter!"
                                    : null,
            })
        }

    }
    const handelRegistrationForm = (e) => {
        setRegistrationForm({
            ...registrationForm,
            [e.target.id]: e.target.value
        })
        if (e.target.id === 'userName') {
            setRegistrationError({
                ...registrationError,
                userNameError: e.target.value.length === 0 ? 'This field is required'
                    : e.target.value.length < 3 ? "min length us 3 characters"
                        : e.target.value.length > 10 ? "min length us 10 characters"
                            : e.target.value.length > 100 ? "max length us 100 characters"
                                : null,
            })
        }
        if (e.target.id === 'email') {
            setRegistrationError({
                ...registrationError,
                emailError: e.target.value.length === 0 ? 'This field is required'
                    : !e.target.value.match(emailPattern) ? 'invalid email'
                        : null,
            })
        }
        if (e.target.id === 'phone') {
            setRegistrationError({
                ...registrationError,
                phoneError:
                    e.target.value.length === 0 ? 'This field is required'
                        : !e.target.value.match(phonePattern) ? 'invalid phone number'
                            : null,
            })
        }
        if (e.target.id === 'password') {
            setRegistrationError({
                ...registrationError,
                passwordError: e.target.value.length === 0 ? 'This field is required'
                    : e.target.value.length <= 8 ? "Your Password Must Contain At Least 8 Characters!"
                        : !(/[A-Z]/.test(e.target.value)) ? "Your Password Must Contain At Least 1 Capital Letter!"
                            : !(/[0-9]/.test(e.target.value)) ? "Your Password Must Contain At Least 1 Number!"
                                : !(/[a-z]/.test(e.target.value)) ? "Your Password Must Contain At Least 1 Lowercase Letter!"
                                    : null,
            })
        }
        if (e.target.id === 'confirmPassword') {
            setRegistrationError({
                ...registrationError,
                confirmPasswordError: e.target.value.length === 0 ? 'This field is required'
                    : e.target.value !== registrationForm.password ? "confirm password does not match"
                        : null,
            })
        }
    }
    function chickIfLogin() {
        setISLogin(!isLogin)
        setTogglePassword("fa-solid fa-eye-slash input-group-append input-group-text")
    }
    function goToHome(value, logout = false) {
        if (loginForm.email.length === 0 || loginForm.password.length === 0) {
            setLoginError({
                ...loginError,
                emailError: 'This field is required',
                passwordError: 'This field is required',
            })
        }
        if (
            registrationForm.email.length === 0 ||
            registrationForm.password.length === 0 ||
            registrationForm.userName.length === 0 ||
            registrationForm.phone.length === 0 ||
            registrationForm.confirmPassword.length === 0
        ) {
            setRegistrationError({
                ...registrationError,
                userNameError: "This field is required",
                emailError: "This field is required",
                phoneError: "This field is required",
                passwordError: "This field is required",
                confirmPasswordError: "This field is required"
            })
        }

        if (
            (
                loginForm.email.length > 0 &&
                loginForm.password.length > 0 &&
                loginError.emailError === null &&
                loginError.passwordError === null
            )
            ||
            (
                registrationForm.userName > 0 &&
                registrationForm.email > 0 &&
                registrationForm.phone > 0 &&
                registrationForm.password > 0 &&
                registrationForm.confirmPassword > 0 &&
                registrationError.userNameError === null &&
                registrationError.emailError === null &&
                registrationError.phoneError === null &&
                registrationError.passwordError === null &&
                registrationError.confirmPasswordError === null

            )
        ) {
            setToHome(value)
        }


        if (logout) {
            setLoginForm({
                email: ""
            })
            setRegistrationForm({
                userName: ""
            })
        }
    }

    function showPassword(elementID, isPassword = false) {
        let password = document.getElementById(elementID);
        if (password.type === "password") {
            password.type = "text";
            isPassword ? setConfTogglePassword("fa-solid fa-eye input-group-append input-group-text")
                : setTogglePassword("fa-solid fa-eye input-group-append input-group-text")
        } else {
            password.type = "password";
            isPassword ? setConfTogglePassword("fa-solid fa-eye-slash input-group-append input-group-text") : setTogglePassword("fa-solid fa-eye-slash input-group-append input-group-text")
        }
    }
    return (
        <>
            {toHome ? (
                <div className='my-5 text-center'>
                    <button className='btn btn-danger' onClick={() => goToHome(false, true)} >log out</button>
                </div>
            ) :
                // 
                (isLogin ? (
                    <div className="login-page">
                        <div className="form">
                            <input type="email" required autoFocus className={`form-control ${loginError.emailError ? 'border border-danger' : ""}`} placeholder=' email address' id='email' onChange={(e) => handelLoginForm(e)} />
                            {loginError.emailError && (<div className='form-text text-danger error'>
                                {loginError.emailError}
                            </div>)}
                            <div className="input-group my-2">
                                <input id='password' className={`form-control ${loginError.passwordError ? 'border border-danger' : ""}`} type="password" placeholder="password" onChange={(e) => handelLoginForm(e)} />
                                <i onClick={(e) => showPassword("password")} className={togglePassword}></i>
                            </div>
                            {loginError.passwordError && (<div className='form-text text-danger error'>
                                {loginError.passwordError}
                            </div>)}
                            <button onClick={() => goToHome(true)} >login</button>
                            <p className="message">Not registered? <span onClick={() => chickIfLogin()}>Create an account</span></p>
                        </div>
                    </div>
                ) : (
                    <div className="login-page">
                        <div className="form">
                            <input type="text" placeholder="name" className={`form-control ${registrationError.userNameError ? 'border border-danger' : ""}`} id="userName" onChange={(e) => handelRegistrationForm(e)} />
                            {registrationError.userNameError && (<div className='form-text text-danger error'>
                                {registrationError.userNameError}
                            </div>)}
                            <input type="text" placeholder="email address" className={`form-control ${registrationError.emailError ? 'border border-danger' : ""}`} id="email" onChange={(e) => handelRegistrationForm(e)} />
                            {registrationError.emailError && (<div className='form-text text-danger error'>
                                {registrationError.emailError}
                            </div>)}
                            <input type="number" placeholder="phone" className={`form-control ${registrationError.phoneError ? 'border border-danger' : ""}`} id="phone" onChange={(e) => handelRegistrationForm(e)} />
                            {registrationError.phoneError && (<div className='form-text text-danger error'>
                                {registrationError.phoneError}
                            </div>)}
                            <div className="input-group my-2">
                                <input id='password' className={`form-control ${registrationError.passwordError ? 'border border-danger' : ""}`} type="password" placeholder="password" onChange={(e) => handelRegistrationForm(e)} />
                                <i onClick={() => showPassword("password")} className={togglePassword}></i>
                            </div>
                            {registrationError.passwordError && (<div className='form-text text-danger error'>
                                {registrationError.passwordError}
                            </div>)}
                            <div className="input-group my-2">
                                <input id='confirmPassword' className={`form-control ${registrationError.confirmPasswordError ? 'border border-danger' : ""}`} type="password" placeholder="confirm password" onChange={(e) => handelRegistrationForm(e)} />
                                <i onClick={() => showPassword("confirmPassword", true)} className={confTogglePassword}></i>
                            </div>
                            {registrationError.confirmPasswordError && (<div className='form-text text-danger error'>
                                {registrationError.confirmPasswordError}
                            </div>)}
                            <button onClick={() => goToHome(true)}>create</button>
                            <p className="message">Already registered? <span onClick={() => chickIfLogin()}>Sign In</span></p>
                        </div>
                    </div>
                )
                )
            }
        </>
    )
}