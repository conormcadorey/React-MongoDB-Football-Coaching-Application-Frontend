import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../Errors";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Fade from 'react-reveal/Fade';

export default function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  //submit form function
  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      //add token to local storage
      localStorage.setItem("auth-token", loginRes.data.token);
      //redirect user to homepage 
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log("error");
    }
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      justifyContent: "center",
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '50%',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    button: {
      padding: 10,
      marginBottom: 20,
      marginTop: 20,
      backgroundColor: '#31333b',
      color: '#FFF',
      '&:hover': {
          backgroundColor: '#FFF',
          color: '#31333b'
      }
    },
    button2: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      padding: 8,
      marginTop: 30,
      backgroundColor: '#FFF',
      color: '#31333b',
      '&:hover': {
          backgroundColor: '#31333b',
          color: '#FFF'
      }
    },
  }));

  const classes = useStyles();

  return (
    <Fade bottom>
    <div className="page">
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}

        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
          <Card variant="outlined">
            <CardContent p={2}>
              <img 
                className="logoImg" 
                src="/images/headrexport1.png" 
                alt=""
              />
              <Typography align="center" c>
                <h4>Sign in</h4>
              </Typography>
              <Typography align="center" variant="body2">
                Created by Youth Coaches, for Youth Coaches 
              </Typography>
              <form className={classes.form} noValidate onSubmit={submit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="login-email"
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
                  id="login-password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  size="large"
                  type="submit"
                  fullWidth
                  variant="outlined"   
                  className={classes.button}
                  disableElevation
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
              </CardContent>
            </Card>
          </div>

          <Button
                  size="small"
                  type="submit"
                  className={classes.button2}
                  disableElevation
                >
                  What is headr?
                </Button>

        </Container>
    </div>
    </Fade>
  );
}