    // https://create-react-app.dev/docs/adding-bootstrap/#using-a-custom-theme
    // https://create-react-app.dev/docs/proxying-api-requests-in-development/

    import React, { useState } from 'react'
    import { useHistory, NavLink } from "react-router-dom";
    import signpic from "../images/signup.svg";
    import { ToastContainer, toast } from 'react-toastify';


    const Signup = () => {
        const history = useHistory();
        // const [name, setName] = useState('');
        // const [password, setPassword] = useState('');
        // const [email, setEmail] = useState('');

        const [user, setUser] = useState({ username: "", name: "", email: "", phone: "", password: "", cpassword: "" })

        let name, value;
        const handleInputs = (e) => {
            name = e.target.name;
            value = e.target.value;

            setUser({ ...user, [name]: value });
        }

        const PostData = async (e) => {
            e.preventDefault();

            const { username, name, email, phone, password, cpassword } = user;

            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // When sending data to a web server, the data has to be a string.
                body: JSON.stringify({
                    username,
                    name,
                    email,
                    phone,
                    password,
                    cpassword
                })
            });

            const data = await res.json();

            if (res.status === 422 || !data) {
                toast.warn('❌ Invalid Crediental ❌');
                window.alert("Invalid Crediental ");
                console.log("registration failed");
            } else if (res.status === 409 || !data) {
                toast.warn('❌ User Already Exist ❌');
                window.alert("User Already Exist ");
            } else if (res.status === 401 || !data) {
                toast.warn('❌ Invalid Password ❌');
                window.alert("Invalid Password ");
            }
            else {
                toast.success('🦄 User Registered Successfully ✔ ');
                window.alert("User Registered Successfully");
                history.push("/signin");
            }

            // const data = await res.json();

        }

        return ( 
            <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                    <label htmlFor="username"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="username" id="username" autoComplete="off" 
                                        value={user.username}
                                        onChange= {handleInputs}
                                     placeholder="Enter Username" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="name" id="name" autoComplete="off" 
                                        value={user.name}
                                        onChange= {handleInputs}
                                     placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" autoComplete="off" 
                                        value={user.email}
                                        onChange= {handleInputs}
                                     placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone"><i className="zmdi zmdi-phone-in-talk"></i></label>
                                    <input type="number" name="phone" id="phone" autoComplete="off" 
                                        value={user.phone}
                                        onChange= {handleInputs}
                                     placeholder="Mobile Number" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="password" id="password" autoComplete="off" 
                                        value={user.password}
                                        onChange= {handleInputs}
                                     placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword"><i className="zmdi zmdi-lock-outline"></i></label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off" 
                                        value={user.cpassword}
                                        onChange= {handleInputs}
                                     placeholder="Confirm your password" />
                                </div>
                        
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" 
                                        onClick={PostData}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image mt-5">
                            <figure><img src={signpic} alt="registartion pic" /></figure>
                            <NavLink to="/signin" className="signup-image-link">I am already register</NavLink>
                        </div>
                    </div>
                    </div>
                </section>
                <ToastContainer position = "top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick rtl={false}
                    pauseOnFocusLoss draggable pauseOnHover />

            </>
        )
    }

    export default Signup