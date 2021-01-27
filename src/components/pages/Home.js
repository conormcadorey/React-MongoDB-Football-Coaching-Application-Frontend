import React, { useEffect, useContext } from 'react'
import UserContext from "../../context/UserContext";
import { useHistory, Link } from "react-router-dom";

export default function Home() {

    const {userData} = useContext(UserContext);
    //const history = useHistory();

    /*
    useEffect(() => {
        //if userData undefined redirect to login 
        if (!userData.user) history.push("/login");
    });
    */

    return(
        <div className="page">
            {userData.user ? (
            <>
            <h1>Hello {userData.user.userName}!</h1>
            <h1>Hello {userData.user.id}!</h1>
            <p>Select from an option below to begin</p>
            <nav>
            <button className="mainButton">Start a match</button>
            <br></br>
            <Link to="/myteam">
            <button className="mainButton">Your team</button>
            </Link>
            <button className="mainButton">Upcoming matches</button>
            <Link to="/test">
            <button className="mainButton">Create a player</button>
            </Link>
            </nav>
            </>

        ) : (
            <>
            <h2>Welcome to headr, the no1 application for amateur and youth football coaches!</h2>
            <Link to="/login">
                <h3 style={{ color: 'black' }}>Login</h3>
            </Link>
            </>
        )}
        </div>
  );
}