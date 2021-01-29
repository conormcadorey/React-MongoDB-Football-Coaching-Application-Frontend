import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import DisplayTeam from "./DisplayTeam";

export default function MyTeam() {

    const {userData} = useContext(UserContext);

    return (

        <div className="page">
            {userData.user ? (
            <>
            <DisplayTeam />
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