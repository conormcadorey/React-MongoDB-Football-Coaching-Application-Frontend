import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../Errors";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export default function Register() {
  //state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [userName, setUserName] = useState();
  const [team, setTeam] = useState();
  const [error, setError] = useState();

  //enable context
  //destructure setUserData 
  const { setUserData } = useContext(UserContext);
  //enable history
  const history = useHistory();

  //submit form function
  const submit = async (e) => {
    e.preventDefault(); //prevent reload 
    //get current form state to add to object
    //use axios to send the newUser object with headers
    try {
      const newUser = { email, password, passwordCheck, userName, team };
      await Axios.post("http://localhost:5000/users/register", newUser);
      //on successful registration, create new user login request using context
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      //response returns token/user data
      //add data to context
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      //add token to local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      //redirect new user to homepage 
      history.push("/");
    } catch (err) {
      //if error exists, set error state
      //only executes if both statements true
      //ie if err msg is undefined = false 
      err.response.data.msg && setError(err.response.data.msg);
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
    }));
  
    const classes = useStyles();

  return (
    <div className="page">
      <div className="pageTitle"><h1>Register</h1></div>
      {/*if error- create an error notice component */}
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}

      <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} noValidate onSubmit={submit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="register-email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="register-password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm password"
            type="password"
            placeholder="Confirm password"
            autoComplete="current-password"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="First name"
            id="register-user-name"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Your Team"
            id="register-your-team"
            type="text"
            onChange={(e) => setTeam(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disableElevation
          >
            Register with Headr
          </Button>
        </form>
      </div>
    </Container>
    </div>  
  );
}