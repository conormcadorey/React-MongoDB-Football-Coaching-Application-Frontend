import React from "react";

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Footer() {

  //Copyright 
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Headr
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    );
  }

  return (
    <div className="footerStyles">
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
}