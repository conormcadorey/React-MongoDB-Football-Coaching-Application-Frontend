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
import SavedFixtures from "./components/pages/SavedFixtures";
import MyFixtures from "./components/pages/Fixtures";
import MyAccount from "./components/pages/MyAccount";
import Statistics from "./components/pages/Statistics";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import UserContext from "./context/UserContext";

//import Test from "./components/pages/Test";

import "./styles.css";

export default function App() {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
        isLoggedIn: false,
        isLoading: true
    });

    useEffect(() => {
        checkLoggedIn(); 
    }, []); 

    const checkLoggedIn = async () => {
        
        let token = localStorage.getItem("auth-token");
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

        if (tokenRes.data) {
            const userRes = await Axios.get("http://localhost:5000/users/", 
            {headers: {"x-auth-token": token },
            })
                setUserData({
                    token,
                    user: userRes.data,
                    isLoggedIn: true,
                    isLoading: false
            })
        }
      };

      /*
      console.log("USER TOKEN")
      console.log(userData.token)
      console.log("USER DATA")
      console.log(userData.user)
      console.log("LOADING")
      console.log(userData.isLoading)
      console.log("LDGGED IN")
      console.log(userData.isLoggedIn)
      */
 
    return ( 
     <> 
        <Router>
            <UserContext.Provider value={{ userData, setUserData }}>
            <Header />
            <div className="container">
            <Switch>
                <ProtectedRoute exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <ProtectedRoute path="/createplayer" component={CreatePlayer} />
                <ProtectedRoute path="/myteam" component={MyTeam} />
                <ProtectedRoute path="/match" component={Match} />
                <ProtectedRoute path="/fixtures" component={MyFixtures} />
                <ProtectedRoute path="/savedfixtures" component={SavedFixtures} />
                <ProtectedRoute path="/myaccount" component={MyAccount} />
                <Route path="/statistics" component={Statistics}/>
                {/*<Route path="/test" component={Test} />*/}
            </Switch>
            </div>
            <Footer/>
            </UserContext.Provider>
        </Router>
     </>
    );
}