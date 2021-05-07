import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addOpposition } from "./../../redux/oppositionSlice";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function NewMatchDialog(props) {

  //props
  const { myTeam } = props;

  const [homeAway, setIsHome] = useState(true);
  const [oppTeam, setOppTeam] = useState("");
  const complete = "N";

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setOppTeam(e.target.value);
  }

  //start new match dialog 
  const handleSubmit = (e) => {
    if (!oppTeam) {
      alert("Please enter an opposition team!");
    } else {
    e.preventDefault();
    //action is passed as first param (addTodo())
    //define payload value using 'value' var
    dispatch(addOpposition(oppTeam));
    history.push("/match");
    }
  };

  let token = localStorage.getItem("auth-token");
  const url = "http://localhost:5000/match";

  //save match to upcoming fixtures
  const handleSave = async (e) => {
    e.preventDefault();
    if (!oppTeam) {
      alert("Please enter an opposition team!");
    } else {
      try {
        const newMatch = { myTeam, oppTeam, homeAway, complete };
        await axios.post(`${url}/saveforlater`, newMatch, {
          headers: {
              "Authorization": token
          }
      })
        history.push("/savedfixtures");
      } catch (err) {
        console.log(err)
      }
    }
  }

  //set match as home/away
  const toggleChecked = () => {
      setIsHome((prev) => !prev);
    };

    /////////////////////////
    const useStyles = makeStyles({
      root: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
      },
    });

    const classes = useStyles();
    /////////////////////////

    return (
      <>

        <Card variant="outlined">
            <CardActions className={classes.root}>
                <Typography color="textSecondary">
                    Create a new match
                </Typography>
            </CardActions>
            <form className="createMatchForm" onSubmit={handleSubmit}>
            <CardContent style={{backgroundColor: "#F4F4F4", padding: "2rem"}}>
                <Typography align="center" variant="h5" component="h2">
                   {myTeam}
                </Typography>
                <Typography align="center" color="textSecondary">
                    vs
                </Typography>
            
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Opposition team"
                    id="opposition-team-name"
                    type="text"
                    value={oppTeam} 
                    onChange={handleChange}
                    inputProps={{style: {textTransform: "capitalize"}}}
                    />
                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                        control={<Switch checked={homeAway} onChange={toggleChecked} color="primary" />}
                        label={homeAway? ("Home") : ("Away")}
                        labelPlacement="end"
                        />
                    </FormGroup>
                </FormControl>
            
            </CardContent>
            <Button 
            size="large" 
            style={{width: "50%", paddingTop: "2rem", paddingBottom: "2rem"}}
            type="submit"
            onClick={handleSubmit}
            >
                <Link style={{color: "#3e5096"}}><h3>START MATCH NOW</h3></Link>
            </Button>
            <Button size="large"
            style={{width: "50%", paddingTop: "2rem", paddingBottom: "2rem"}}
            type="submit"
            onClick={handleSave}
            >
                <h3>SAVE FOR LATER </h3>
            </Button>
            </form>
        </Card>
        </>
    );
}