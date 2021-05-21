import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import DisplayStats from "./DisplayStats";

import Typography from '@material-ui/core/Typography';
import TimelineIcon from '@material-ui/icons/Timeline';

export default function Statistics() {

    const {userData} = useContext(UserContext);

    return (
        <div className="page">
            <div className="pageTitle" style={{color: "#FFF", padding: "1rem", marginBottom: "1rem"}}>
                <TimelineIcon fontSize="large"/>
                <br></br>
                <Typography variant="h5" align="center">
                    Statistics
                </Typography>
            </div>
            <DisplayStats myTeam={userData.user.team}/>
        </div>
    )
}