import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import ErrorNotice from "../Errors";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export default function CreatePlayer() {
  //state
  const [name, setName] = useState();
  const [position, setPosition] = useState();
  const [number, setNumber] = useState();

  const [error, setError] = useState();

  //enable context
  //destructure logged in users data
  const {userData} = useContext(UserContext);
  //enable history
  const history = useHistory();

  useEffect(() => {
    //if userData undefined redirect to login 
    if (!userData.user) history.push("/login");
  });

  //submit form function
  const submit = async (e) => {
    e.preventDefault(); //prevent reload 
    //get current form state to add to object
    //use axios to send the newUser object with headers
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
      //redirect user
      history.push("/myteam");
    } catch (err) {
      //errors
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

    return (
        <div className="page">
        <h2>Create a new player</h2>
        {/*if error- create an error notice component */}
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}

        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={submit}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Player's main position"
            id="register-player-position"
            type="text"
            onChange={(e) => setPosition(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Player's number"
            id="register-player-number"
            type="text"
            onChange={(e) => setNumber(e.target.value)}
          />

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
        </form>
      </div>

    </Container>

    </div>  
    );
}