import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import UpcomingFixtures from "./UpcomingFixtures";
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import Typography from '@material-ui/core/Typography';

export default function SavedFixtures() {

const {userData} = useContext(UserContext);

return (
    <div className="page">
        <>
            <div className="pageTitle" style={{color: "#FFF", padding: "1rem", marginBottom: "1rem"}}>
                <WatchLaterIcon fontSize="large"/>
                <br></br>
                <Typography variant="h5" align="center">
                    Upcoming fixtures
                </Typography>
            </div>
            <UpcomingFixtures team={userData.user.team} />
        </>
    </div>
  );
}