import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import DisplayTeam from "./DisplayTeam";

export default function MyTeam() {

    const [players, setPlayers] = useState([]);

    const {userData} = useContext(UserContext);
    //const history = useHistory();

    return(

        <div className="page">
            {userData.user ? (
            <>
            <DisplayTeam/>
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