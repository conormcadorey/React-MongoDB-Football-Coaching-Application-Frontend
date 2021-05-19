import React, { useContext } from "react";
import userContext from "../../context/UserContext";

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Footer() {

  const {userData} = useContext(userContext);

  //Copyright 
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="">
          Headr
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    );
  }

  return (
    <div className="footerStyles">
      {userData.user ? (
        <img 
        className="logoImg" 
        src="/images/headrexport1.png" 
        alt=""
      />
      ) : ("n")}
      <Box mt={2}>
        <Copyright />
      </Box>
    </div>
  );
}