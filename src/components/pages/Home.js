import React, { useState, useEffect, useContext } from 'react'
import UserContext from "../../context/UserContext";
import { useHistory, Link } from "react-router-dom";
import NewMatchDialog from "./NewMatchDialog";

import Container from '@material-ui/core/Container';


export default function Home() {

    const {userData} = useContext(UserContext);
    //const history = useHistory();

    /*
    useEffect(() => {
        //if userData undefined redirect to login 
        if (!userData.user) history.push("/login");
    });
    */

    //useEffect to clear oppTeam when match ends or match live = false

    return(
        <Container component="main" maxWidth="xs">
        <div className="page">
            {userData.user ? (
            <>
            <h1>Hello {userData.user.userName}!</h1>
            <p>Select from an option below to begin</p>
            <nav>
            <NewMatchDialog/>
            <br></br>
            <button className="mainButton">Upcoming matches</button>
            <button className="mainButton">Previous matches</button>
            <Link to="/myteam">
            <button className="mainButton">Your team</button>
            </Link>
            <Link to="/createplayer">
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
        </Container>
  );
}