import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

export default function DisplayTeam() {

    const [players, setPlayers] = useState([]);

    const {userData} = useContext(UserContext);
    //const history = useHistory();

    /*
    useEffect(() => {
        axios.get("http://localhost:5000/players/all")
            .then( response => setPlayers(response.data))
            .catch( error => console.log(error));
    }, []);
    */

    useEffect(() => {
        let token = localStorage.getItem("auth-token");
        const url = "http://localhost:5000/players";
        console.log("THE TOKEN:");
        console.log(token);

        axios.get(`${url}/allauth`, {
            headers: {
                "Authorization": token
            }
        })
            .then( response => setPlayers(response.data))
            .catch( error => console.log(error));
    }, []);

    return(
        <>
            {players ? (
            <>
            <h1>Your team</h1>
            {players.map(player => {
                const { _id, name, position, number } = player;
                return (
                    <div className="playerCard">
                        <h1> {name} </h1>
                        <p> {position} {number}</p>
                    </div>
                )
            })}
            </>
        ) : (
            <CircularProgress/>
        )}
        </>
  );
}