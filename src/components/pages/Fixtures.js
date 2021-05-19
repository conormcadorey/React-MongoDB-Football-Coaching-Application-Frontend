import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import RedirectToLogin from "./RedirectLogin";
import PreviousFixtures from "./PreviousFixtures";
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

export default function MyFixtures() {

const {userData} = useContext(UserContext);


return (
        <div className="page">
            {userData.user ? (
                <>
                <div className="pageTitle" style={{color: "#FFF", padding: "1rem", marginBottom: "1rem"}}>
                    <DoneIcon fontSize="large"/>
                    <br></br>
                    <Typography variant="h5" align="center">
                        Previous fixtures
                    </Typography>
                </div>
                <PreviousFixtures team={userData.user.team} myId={userData.user.id} />
                </>
            ) : (
                <RedirectToLogin />
            )}
        </div>
  );
}