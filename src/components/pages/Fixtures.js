import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import RedirectToLogin from "./RedirectLogin";
import PreviousFixtures from "./PreviousFixtures";

export default function MyFixtures() {

const {userData} = useContext(UserContext);


return (
        <div className="page">
            {userData.user ? (
                <PreviousFixtures />
            ) : (
                <RedirectToLogin />
            )}
        </div>
  );
}