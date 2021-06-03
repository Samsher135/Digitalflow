import React, { useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";
import profile from "../images/profile.png";
import login from "../images/login.png";
import website from "../images/website.png";

const Home = () => {
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    
    const getUserName = async () => {
        try {
            const response = await fetch('/getUserDetails', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }); 
            console.log(response);
            const data = await response.json();
            console.log(`My Home data `+data.name);
            if (data) {
                setName(data.name);
                setShow(true);
            }
        } catch (error) {
            console.log(`My Home page error `+error);
          }
    }

    useEffect(() => {
        getUserName();
    }, []);
    return (
        <>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <NavLink to="/secret"><div className="img1"><img src={profile} alt="About me" /><h1>About Me</h1></div></NavLink>
                    </div>
                    </div>
                    <div className="column">
                    <div className="card">
                        <NavLink to="/signin"><div className="img1">
                            <img src={login} alt="Login" />
                            <h1>Login</h1>
                        </div></NavLink>
                    </div>  
                    </div>
                    <div className="column">
                    <div className="card">
                        <NavLink to="/signup"><div className="img1">
                            <img src={website} alt="Register" />
                            <h1>Register</h1>
                        </div></NavLink>
                    </div>  
                </div>
            </div>
        </>
    )
}

export default Home
