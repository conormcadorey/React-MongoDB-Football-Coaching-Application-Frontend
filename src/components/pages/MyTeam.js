import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import DisplayTeam from "./DisplayTeam";
import RedirectToLogin from "./RedirectLogin";
import Card from '@material-ui/core/Card';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

export default function MyTeam() {

const {userData} = useContext(UserContext);

return (
        <div className="page">
            {userData.user ? (
                <>
                <Card variant="outlined" style={{backgroundColor: "#FFF", padding: "1rem", marginBottom: "1rem"}}>
                    <div className="pageTitle">
                        <EmojiPeopleIcon fontSize="large"/>
                        <br></br>
                        <h1>My team</h1>
                    </div>
                </Card>
                <DisplayTeam myTeam={userData.user.team} myId={userData.user.id}/>
                </>
            ) : (
                <RedirectToLogin/>
            )}
        </div>
  );
}