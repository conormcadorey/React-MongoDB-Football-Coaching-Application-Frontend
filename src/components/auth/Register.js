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
        getTeams();
    }, []);

    const getTeams = async () => {
        await Axios.get("http://localhost:5000/users/allteams")
            .then((res) => {
                setTeams(res.data)
            })
            .catch( error => console.log(error));
    }

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

          <Autocomplete
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