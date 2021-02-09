import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import DisplayTeam from "./DisplayTeam";
import RedirectToLogin from "./RedirectLogin";


export default function MyTeam() {

const {userData} = useContext(UserContext);

return (
        <div className="page">
            {userData.user ? (
                <DisplayTeam myTeam={userData.user.team} myId={userData.user.id}/>
            ) : (
                <RedirectToLogin/>
            )}
        </div>
  );
}