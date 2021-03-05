import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";

import Header from "./components/layout/Header";
import Footer from "./components/pages/Footer";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import MyTeam from "./components/pages/MyTeam";
import Match from "./components/pages/Match";
import Register from "./components/auth/Register";
import CreatePlayer from "./components/pages/CreatePlayer";
import MyFixtures from "./components/pages/Fixtures";
import EditPlayerDialog from "./components/pages/EditPlayerDialog";
import MyAccount from "./components/pages/MyAccount";

import UserContext from "./context/UserContext";

import Test from "./components/pages/Test";

import "./styles.css";

export default function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    //run this effect when the app starts up
    //it checks the browser for an existing jwttoken from a previous session 
    useEffect(() => {
        checkLoggedIn(); 
    }, []); 

        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
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
                    const userRes = await Axios.get("http://localhost:5000/users/", 
                    {headers: {"x-auth-token": token },});
                //state is now globally accessible thru UserContext.Provider
                setUserData({
                    token,
                    user: userRes.data,
                })
                .then(
                    console.log("SUCCESS")
                )
                .catch( error => console.log("NO USER"));
                }
        };
       
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
                <Route path="/fixtures" component={MyFixtures} />
                <Route path="/editplayer/:id" component={EditPlayerDialog}/>
                <Route path="/myaccount" component={MyAccount} />

                <Route path="/test" component={Test} />
            </Switch>
            </div>
            <Footer/>
            </UserContext.Provider>
        </Router>
     </>
    );
}