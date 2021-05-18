import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../Errors";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Fade from 'react-reveal/Fade';

import axios from "axios";

export default function Register() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [userName, setUserName] = useState();
  const [team, setTeam] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const [teams, setTeams] = useState([]);

    useEffect(() => {
      let cancel
      const getTeams = async () => {
        await Axios.get("http://localhost:5000/users/allteams", {
        cancelToken: new axios.CancelToken(c => cancel = c)
       })
            .then((res) => {
                setTeams(res.data)
            })
            .catch( error => {
              console.log(error)
              //stop logging any cancel requests as an error as the cancellation is intentional
              if (axios.isCancel(error)) return
            });
    }
    getTeams();
    return () => cancel()
    }, []);

  //submit form function
  const submit = async (e) => {
    e.preventDefault(); 
    try {
      const newUser = { email, password, passwordCheck, userName, team };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  
    const useStyles = makeStyles((theme) => ({
      paper: {
        display: 'flex',
        justifyContent: "center",
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '25%',
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
                <h4>Register</h4>
              </Typography>
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

          <Autocomplete
            freeSolo //allow custom user inputs
            autoSelect //retain value after input looses focus 
            style={{ marginTop: '1rem'}}
            id="register-your-team"
            options={teams}
            onChange={(event, value) => setTeam(value)}
            onInputChange={(event, value) => setTeam(value)}
            renderInput={(params) => <TextField {...params} label="Your team*" variant="outlined" />}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Your Team"
          /> 

          <Button
            type="submit"
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            disableElevation
          >
            Register with Headr
          </Button>

        </form>
        </CardContent>
        </Card>
      </div>
    </Container>
    </div>  
    </Fade>
  );
}