import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CreateIcon from '@material-ui/icons/Create';

import Fade from 'react-reveal/Fade';

export default function CreatePlayer() {

  const {userData} = useContext(UserContext);
  const history = useHistory();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("N/A");
  const [number, setNumber] = useState();
  const team = userData.user.team;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //submit form function
  const submit = async (e) => {
      e.preventDefault(); 
      if (!name) {
        alert("Please enter the players name!");
      } else {
      try {
        const newPlayer = { name, position, number, team };
        let token = localStorage.getItem("auth-token");
        const url = "http://localhost:5000/players";

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
      justifyContent: "center",
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '25%',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#31333b',
      color: '#FFF',
        '&:hover': {
          backgroundColor: '#31333b',
          color: '#FFF'
      }
    },
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        minWidth: 120,
      },
  }));

  const classes = useStyles();

    return (
      <div className="page">
        <Fade left big>
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Card variant="outlined">
            <CardContent p={2}>
              <div className="pageTitle">
                <CreateIcon fontSize="large"/>
                <br></br>
                <Typography variant="h5" align="center">
                    Create a new {team} player
                </Typography>
              </div>
                <form className={classes.form} noValidate onSubmit={submit}>
                  <Typography variant="body2">
                    Registering your players is easy! All you need for now is their name. Change a players details at any time by &nbsp;
                    <Link to="/myteam" style={{color: "#323a5a"}}>
                        clicking here.
                    </Link> 
                    <br></br>
                    <br></br>
                  <b>Please be aware that this player will be automatically registered to the team that you coach.</b>
                  </Typography>
                  <br></br>
                  <Typography variant="body2" color="textSecondary">
                    Enter your new players full name
                  </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="register-player-name"
                    type="text"
                    label="Name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                  
                  <Typography variant="body2" color="textSecondary">
                    Select your new players main position
                  </Typography>
                  <FormControl className={classes.formControl}>
                      <Select
                      variant="outlined"
                      id="register-player-position"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      >
                      <MenuItem value={"N/A"}>N/A</MenuItem>
                      <MenuItem value={"Forward"}>Forward</MenuItem>
                      <MenuItem value={"Midfield"}>Midfield</MenuItem>
                      <MenuItem value={"Defence"}>Defence</MenuItem>
                      <MenuItem value={"Goal Keeper"}>Goal Keeper</MenuItem>
                      </Select>
                  </FormControl>

                  <Typography variant="body2" color="textSecondary">
                    Enter your new players squad number 
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
                    size="large"
                    className={classes.submit}
                    disableElevation
                  >
                    Create Player
                  </Button>
                  ) : (
                    <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    className={classes.submit}
                    disabled
                  >
                    Create Player
                  </Button>
                  )}
                </form>
          </CardContent>
        </Card> 
        </div>
    </Container>
    </Fade>
    </div>  
    );
}