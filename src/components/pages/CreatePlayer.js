import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

export default function CreatePlayer() {

  const [name, setName] = useState();
  const [position, setPosition] = useState();
  const [number, setNumber] = useState();

  //destructure logged in users data
  const {userData} = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/login");
  });

  //submit form function
  const submit = async (e) => {
      e.preventDefault(); 
      if (!name) {
        alert("Please enter the players name!");
      } else {
      try {
        const newPlayer = { name, position, number };
        let token = localStorage.getItem("auth-token");
        const url = "http://localhost:5000/players";
        console.log("THE TOKEN:");
        console.log(token);

        axios.post(`${url}/`, newPlayer, {
          headers: {
              "Authorization": token
          }
      })
        history.push("/myteam");
      } catch (err) {
        console.log(err)
      }
    }

  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    root: {
      //minWidth: 275,
    },
    pos: {
      marginBottom: 18,
    },
  }));

  const classes = useStyles();

    return (
      <div className="page">
      <div className="pageTitle"><h1>Create a new player</h1></div>
      <Card variant="outlined" className={`${classes.pos} ${classes.root}`} style={{backgroundColor: "#F4F4F4", padding: "2rem"}}>
        <CardContent>
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form className={classes.form} noValidate onSubmit={submit}>
            <Typography variant="body2">
                Registering your new player is easy! The only requirement for now is their name. You can add any other details by clicking here after. 
            </Typography>
            <br></br>
            <br></br>
            <Typography variant="body2" color="textSecondary">
            <Badge badgeContent={1} color="primary"></Badge> 
            .. Enter your new players full name
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="register-player-name"
              type="text"
              label="First name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <Typography variant="body2" color="textSecondary">
            <Badge badgeContent={2} color="primary"></Badge> 
             .. Select your new players main position
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Player's main position"
              id="register-player-position"
              type="text"
              onChange={(e) => setPosition(e.target.value)}
            />
            <Typography variant="body2" color="textSecondary">
            <Badge badgeContent={3} color="primary"></Badge> 
            .. Enter your new players squad number 
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Player's squad number"
              id="register-player-number"
              type="text"
              onChange={(e) => setNumber(e.target.value)}
            />
            {name ? (
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
            >
              Create Player
            </Button>
            ) : (
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
              disabled
            >
              Create Player
            </Button>
            )}
          </form>
        </div>
    </Container>
    </CardContent>
    </Card>
    </div>  
    );
}