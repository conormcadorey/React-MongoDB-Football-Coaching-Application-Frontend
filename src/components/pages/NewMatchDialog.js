import React, { useState } from "react";
import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function NewMatchDialog(props) {

    const [isHome, setIsHome] = useState(true);
    const [oppTeam, setOppTeam] = useState("");

    const toggleChecked = () => {
        setIsHome((prev) => !prev);
      };

     /////////////////////////
     const useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        pos: {
          marginBottom: 18,
        },
      });

    const classes = useStyles();
    /////////////////////////

    return (

        <Card variant="outlined">
            <CardActions>
                <Typography color="textSecondary">
                    Create a new match
                </Typography>
            </CardActions>
            <CardContent style={{backgroundColor: "#F4F4F4"}}>
                <Typography align="center" variant="h5" component="h2">
                    My Team
                </Typography>
                <Typography align="center" color="textSecondary">
                    vs
                </Typography>
            <form>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Opposition team"
                    id="opposition-team-name"
                    type="text"
                    onChange={(e) => setOppTeam(e.target.value)}
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
            </form>
            </CardContent>
            <Button size="large" style={{width: "50%"}}>
                <Link style={{color: "#3e5096"}} to="/match"><h3>START MATCH NOW</h3></Link>
            </Button>
            <Button size="large" style={{width: "50%"}}>
                <h3>SAVE FOR LATER </h3>
            </Button>

            <h1>{oppTeam}</h1>

        </Card>

    );

}