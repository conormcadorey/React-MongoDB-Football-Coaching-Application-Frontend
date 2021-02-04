import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addOpposition } from "./../../redux/oppositionSlice";

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

  const [isHome, setIsHome] = useState(true);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e) => {
    if (!value) {
      alert("Please enter an opposition team!");
    } else {
    e.preventDefault();
    //dispatch hook takes in an action
    //action is passed as first param (addTodo())
    //define payload value using 'value' var
    dispatch(addOpposition(value));
    //setValue(""); //reset empty text-input 
    //redirect user to homepage 
    history.push("/match");
    }
  };

    const toggleChecked = () => {
        setIsHome((prev) => !prev);
      };

    return (
      <>

        <Card variant="outlined">
            <CardActions>
                <Typography color="textSecondary">
                    Create a new match
                </Typography>
            </CardActions>
            <form className="createMatchForm" onSubmit={handleSubmit}>
            <CardContent style={{backgroundColor: "#F4F4F4"}}>
                <Typography align="center" variant="h5" component="h2">
                    My Team
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
                    value={value} 
                    onChange={handleChange}
                    />
                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                        control={<Switch checked={isHome} onChange={toggleChecked} color="primary" />}
                        label={isHome? ("Home") : ("Away")}
                        labelPlacement="end"
                        />
                    </FormGroup>
                </FormControl>
            
            </CardContent>
            <Button 
            size="large" 
            style={{width: "50%"}}
            type="submit"
            onClick={handleSubmit}
            >
                <Link style={{color: "#3e5096"}}><h3>START MATCH NOW</h3></Link>
            </Button>
            <Button size="large" style={{width: "50%"}}>
                <h3>SAVE FOR LATER </h3>
            </Button>
            </form>
        </Card>
        </>
    );
}