import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import RedirectToLogin from "./RedirectLogin";
import PreviousFixtures from "./PreviousFixtures";
import Card from '@material-ui/core/Card';
import DoneIcon from '@material-ui/icons/Done';

export default function MyFixtures() {

const {userData} = useContext(UserContext);


return (
        <div className="page">
            {userData.user ? (
                <>
                <Card variant="outlined" style={{backgroundColor: "#FFF", padding: "1rem", marginBottom: "1rem"}}>
                    <div className="pageTitle">
                        <DoneIcon fontSize="large"/>
                        <br></br>
                        <h1>Previous fixtures</h1>
                    </div>
                </Card>
                <PreviousFixtures team={userData.user.team} myId={userData.user.id} />
                </>
            ) : (
                <RedirectToLogin />
            )}
        </div>
  );
}