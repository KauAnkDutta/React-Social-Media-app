import React, {useRef, useContext} from "react";
import './Login.css';
import {loginCall} from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';
import {Link} from 'react-router-dom';

function Login(){
    const email = useRef()
    const password = useRef()
    const {isFetching, dispatch} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({email: email.current.value, password: password.current.value}, dispatch)
        
    }

    return(
        <div className="login">
            <div className="loginWrapper">
                <div className="login_left">
                    <h3 className="login_logo">Tribe Media</h3>
                    <span className="login_desc">
                        Connect with friends and the world around you on Tribe Media
                    </span>
                </div>

                <div className="login_right">
                    <form className="login_form_box" onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" className="login_input" ref={email} required/>

                        <input type="password" placeholder="Password"
                        minLength="6" className="login_input" ref={password} required/>

                        <button className="login_button" disabled={isFetching}>
                            {isFetching? <CircularProgress color="inherit" size="18px"/> : "Log In"}
                        </button>

                        <span className="login_forgot_password">
                            Forgot Password?
                        </span>
                        
                        <Link to='/register' className="btn_link">
                            <button className="login_register_button">
                                <span>Create a New Account</span>
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;