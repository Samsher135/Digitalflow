import React, {useContext} from 'react'
import { NavLink } from "react-router-dom";
import logo from "../images/logo2.png";
import {UserContext} from "../App";

const Navbar = () => {

    const { state, dispatch } = useContext(UserContext);
    console.log(`the navbar user ${state} and ${dispatch}`);
    
    const RenderList = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item active">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/">Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/secret">AboutMe</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink exact activeClassName="active-page" className="nav-link" to="/logout">logout</NavLink>
                    </li> 
               </>     
                
            )
        } else {
            return (
                <>
                 <li className="nav-item active">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/">Home </NavLink>
                    </li>
                <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/secret">AboutMe</NavLink>
                    </li>

                   <li className="nav-item">
                     <NavLink exact activeClassName="active-page" className="nav-link" to="/signin">Login</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/signup">Register</NavLink>
                  </li>
                  
                    
                </>
            )
        }
    }

    return (
        <>
            <div className="container">

        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt="logo" />
            </NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                 
                            {/* {renderList()}                         */}
                            <RenderList />
{/* 
                            {
                                show ?
                                    <>
                                    <li className="nav-item">
                                        <NavLink exact activeClassName="active-page" className="nav-link" to="/signup">Register</NavLink>
                                    </li>

                                    <li className="nav-item">
                                      <NavLink exact activeClassName="active-page" className="nav-link" to="/signin">Login</NavLink>
                                    </li>
                                </> :
                                    
                                <>
                                    <li className="nav-item">
                                       <NavLink exact activeClassName="active-page" className="nav-link" to="/logout">logout</NavLink>
                                    </li>     
                                </>
                    } */}
                    
                </ul>
               
            </div>
          </nav>
                                
        </div>  
        </>
    )
}

export default Navbar
