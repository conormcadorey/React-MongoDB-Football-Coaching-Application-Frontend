import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import RedirectToLogin from "./RedirectLogin";

export default function MyFixtures() {

const {userData} = useContext(UserContext);

const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

return (
        <div className="page">
            {userData.user ? (
            <>
            <div className="pageTitle"><h1>My fixtures</h1></div>
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Upcoming" />
                        <Tab label="Previous" />
                    </Tabs>
                </Paper>
            </>
        ) : (
            <RedirectToLogin />
        )}
        </div>
  );
}