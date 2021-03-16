import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import RedirectToLogin from "./RedirectLogin";
import UpcomingFixtures from "./UpcomingFixtures";

export default function MyFixtures() {

const {userData} = useContext(UserContext);


return (
        <div className="page">
            {userData.user ? (
                <UpcomingFixtures />
            ) : (
                <RedirectToLogin />
            )}
        </div>
  );
}