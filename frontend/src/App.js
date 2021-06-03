import React, {useEffect, createContext, useReducer, useContext} from 'react'
import {  Route,Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import Navbar from "./component/navbar";
import Home from "./component/home";
import Signin from "./component/signin";
import Signup from "./component/signup";
import Secret from "./component/secret";
import Logout from "./component/logout";
import { initialState, reducer } from './reducer/userReducer';


// for toggle logout login 
export const UserContext = createContext();

const Routing = () => {

   const { state, dispatch } = useContext(UserContext);

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
            console.log(`My Home data Login `+data.name);
            if (data) {
                dispatch({ type: 'USER', payload:data });
              console.log(`login ka useffect ` + data);
            }
        } catch (error) {
            console.log(`My Home page error `+error);
          }
    }

    useEffect(() => {
      getUserName();
    }, []);


  return (
    <Switch>
          <Route exact path="/">
              <Home />
          </Route>
          
          <Route path="/secret">
              <Secret />
          </Route>

          <Route path="/signin">
              <Signin />
          </Route>

          <Route path="/signup">
              <Signup />
          </Route>

          <Route path="/logout">
              <Logout />
          </Route>
    </Switch>
  )
}

const App = () => {
  // now I need to called the dispatch method and it will call reducer method and there 
  // I can change the state value and then with useContext I can check the state and based 
  // on it I will render my navbar list 
  const [state,dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
    
        <Navbar />

        <Routing />
      
       </UserContext.Provider>
    </>
  )
}

export default App
