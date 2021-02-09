import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import RedirectLogin from "./RedirectLogin";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

export default function MyAccount() {

    const {userData} = useContext(UserContext)
    const [name, setName] = useState("");

    const submitName = () => {
        console.log("")
    }

    const useStyles = makeStyles((theme) => ({
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
          },
        button: {
            padding: 14,
            marginBottom: 16,
            '&:hover': {
                backgroundColor: '#31333b',
                color: '#FFF'
            }
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
          },
      }));

    const classes = useStyles();

    return (
        <>
        {userData.user ? (
            <Container component="main" maxWidth="xs">
            <div className="page">
                <Box display="flex">
                    <Box flexGrow={1}>
                        <div className="pageTitle"><h1>My account</h1></div>
                    </Box>
                    <Box>
                        <Avatar src="/broken-image.jpg" style={{ height: '70px', width: '70px' }}/>
                    </Box>
                </Box>
            <Typography>
                You can modify your personal information from this page. 
            </Typography>
            <br></br>
            <hr></hr>
            <form className={classes.form} noValidate onSubmit={submitName}>
            <Typography variant="body2" color="textSecondary">
              Your name
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="change-name"
              type="text"
              label="Name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
            >
              Save
            </Button>
            </form>

            <Button 
                className={classes.button}
                variant="outlined"          
                size="large"
                fullWidth={true}
                >
                    Change password
            </Button>
            <Button 
                className={classes.button}
                variant="outlined"          
                size="large"
                fullWidth={true}
                >
                    Change profile photo
            </Button>
            <Button 
                className={classes.button}
                variant="outlined"          
                size="large"
                fullWidth={true}
                >
                    Change team
            </Button>
            </div>
            </Container>
        ) : (
            <RedirectLogin/>
        ) }
        </>
    );
}