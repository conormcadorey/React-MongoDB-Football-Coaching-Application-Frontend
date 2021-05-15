import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import RedirectToLogin from "./RedirectLogin";
import UpcomingFixtures from "./UpcomingFixtures";

import Typography from '@material-ui/core/Typography';

export default function SavedFixtures() {

const {userData} = useContext(UserContext);


return (
        <div className="page">
            {userData.user ? (
                <>
                <div className="pageTitle"><h1>Upcoming fixtures</h1></div>
                <Typography variant="body2">
                    Below, are all of your upcoming saved fixtures. Just select from a fixture to begin a new match instantly! 
                    <br></br><br></br>
                </Typography>
                <UpcomingFixtures team={userData.user.team} />
                </>
            ) : (
                <RedirectToLogin />
            )}
        </div>
  );
}