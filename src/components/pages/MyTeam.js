import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import DisplayTeam from "./DisplayTeam";
import RedirectToLogin from "./RedirectLogin";
import Typography from '@material-ui/core/Typography';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

export default function MyTeam() {

const {userData} = useContext(UserContext);

return (
        <div className="page">
            {userData.user ? (
                <>
                <div className="pageTitle" style={{color: "#FFF", padding: "1rem", marginBottom: "1rem"}}>
                    <EmojiPeopleIcon fontSize="large"/>
                    <br></br>
                    <Typography variant="h5" align="center">
                        My team
                    </Typography>
                </div>
                <DisplayTeam myTeam={userData.user.team} myId={userData.user.id}/>
                </>
            ) : (
                <RedirectToLogin/>
            )}
        </div>
  );
}