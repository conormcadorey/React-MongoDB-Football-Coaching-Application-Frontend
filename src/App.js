import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

import Header from "./components/layout/Header";
import Footer from "./components/pages/Footer";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
//import DisplayTeam from "./components/pages/DisplayTeam";
import MyTeam from "./components/pages/MyTeam";
import Match from "./components/pages/Match";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import CreatePlayer from "./components/pages/CreatePlayer";
import Test from "./components/pages/Test";

import "./styles.css";

export default function App() {

    //set default state 
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    //run this effect when the app starts up
    //it checks the browser for an existing jwttoken from a previous session 
    //the token can keep track of the logged in users data 
    //useState makes the token data globally accessible 
    useEffect(() => {
        //cant use async with useEffect
        //instead define a seperate async function inside useEffect and call it 

        //function to check if a user token already exists from previous session in local storage 
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            //check if token is null
            //set token to an empty string if null
                if (token === null) {
                localStorage.setItem("auth-token", ""); 
                token = "";
            }
            //if a token exists axios returns response as a json object
            //next check if the token is valid 
            const tokenRes = await Axios.post(
                "http://localhost:5000/users/tokenIsValid",
                null,
                { headers: {"x-auth-token": token } }
                );
                //if tokenIsValid true 
                if (tokenRes.data) {
                    //get the user data that belongs to the token 
                    const userRes = await Axios.get("http://localhost:5000/users/", 
                    {headers: {"x-auth-token": token },});
                //set user data inside the useState const
                //state is now globally accessible thru UserContext.Provider
                setUserData({
                    token,
                    user: userRes.data,
                });
                }
        };
        checkLoggedIn(); //call async function here
    }, []); //empty dependency array, so useEffect only runs once (on start)

    //react-router helps map specific URL paths to different components 
    //UserContext passes application state to all components inside it 
    return ( 
     <> 
        <Router>
            <UserContext.Provider value={{ userData, setUserData }}>
            <Header />
            <div className="container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/createplayer" component={CreatePlayer} />
                <Route path="/myteam" component={MyTeam} />
                <Route path="/match" component={Match} />
            </Switch>
            </div>
            <Footer/>
            </UserContext.Provider>
        </Router>
     </>
    );
}