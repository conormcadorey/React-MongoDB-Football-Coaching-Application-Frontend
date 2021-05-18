import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import RedirectToLogin from "./RedirectLogin";
import UpcomingFixtures from "./UpcomingFixtures";
import Card from '@material-ui/core/Card';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

export default function SavedFixtures() {

const {userData} = useContext(UserContext);


return (
        <div className="page">
            {userData.user ? (
                <>
                <Card variant="outlined" style={{backgroundColor: "#FFF", padding: "1rem", marginBottom: "1rem"}}>
                    <div className="pageTitle">
                        <WatchLaterIcon fontSize="large"/>
                        <br></br>
                        <h1>Upcoming fixtures</h1>
                    </div>
                </Card>
                <UpcomingFixtures team={userData.user.team} />
                </>
            ) : (
                <RedirectToLogin />
            )}
        </div>
  );
}