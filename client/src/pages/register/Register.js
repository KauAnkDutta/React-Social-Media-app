import React, {useRef} from "react";
import './Register.css';
import {axiosInstance} from '../../config';

function Register(){
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const city = useRef();
    const hometown = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!")
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                city: city.current.value,
                from: hometown.current.value,
            }

            try {
                await axiosInstance.post(`api/userRegister`, user)
                    .then(res => {
                        if(res.status === 200){
                            window.location.href = '/login';
                        }
                        
                    })             
            } catch (error) {
                console.log(error)
            }   
        }
    }


    return(
        <div className="register">
            <div className="registerWrapper">
                <div className="register_left">
                    <h3 className="register_logo">Tribe Media</h3>
                    <span className="register_desc">
                        Connect with friends and the world around you on Tribe Media
                    </span>
                </div>

                <div className="register_right">
                    <form className="register_form_box" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" className="register_input" ref={username} required autoComplete="true"/>

                        <input type="email" placeholder="Email" className="register_input" ref={email} required/>

                        <input type="password" placeholder="Password" className="register_input" ref={password} required minLength='6'/>
 
                        <input type="password" placeholder="Password Again" className="register_input" ref={passwordAgain} required minLength='6'/>

                        <input type="text" placeholder="City" className="register_input" ref={city} required />

                        <input type="text" placeholder="Hometown" className="register_input" ref={hometown} required />

                        <button className="register_button" type="submit">
                            Sign Up
                        </button>
                        
                        <div className="or_container">
                            <span className='or_text'>Or</span>
                            <hr />
                        </div>

                        <button className="register_register_button">
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;