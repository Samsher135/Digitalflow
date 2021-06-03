import React, { useState, useContext } from 'react'
import { UserContext } from "../App";
import loginpic from "../images/login.svg";
import { NavLink ,useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    
    const {state,dispatch} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    
    const loginUser = async (e) => {     
        e.preventDefault();
        
        const res = await fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();
        console.log(`login ka data ` + data);
        
        if ( res.status === 400 ||  res.status === 404 || res.status === 422 ||  !data) {
             window.alert("Invalid Details");
             toast.warn('❌ Invalid credentials ❌');
            //  history.push('/signin');
        } else {
             // we are sending the data too for toggel login logut 
            dispatch({ type: 'USER', payload: true });
            toast.success('🦄 Wow so easy!');
            window.alert("User Login Successfully");
            console.log(`sigin ka `+data.name);
           
            history.push('/'); 
        }

        // console.log(`the email is ${email} and the password is ${password}`);
    }

    return (
        <>
            {/* <!-- Sing in  Form --> */}
            <section className="sign-in ">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure ><img src={loginpic} alt="Login Pic" /></figure>
                            <NavLink to="/signup" className="signup-image-link">Create an account</NavLink>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign In</h2>
                            <form method="POST" className="register-form" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-account material-icons-email"></i></label>
                                    <input type="email" email="email" id="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="password" id="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" />
                                </div>
                                {/* <div className="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                    <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                                </div> */}
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" 
                                        onClick={loginUser}
                                    />
                                </div>
                            </form>
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li><NavLink to="#"><i className="display-flex-center zmdi zmdi-facebook"></i></NavLink></li>
                                    <li><NavLink to="#"><i className="display-flex-center zmdi zmdi-twitter"></i></NavLink></li>
                                    <li><NavLink to="#"><i className="display-flex-center zmdi zmdi-google"></i></NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Signin

