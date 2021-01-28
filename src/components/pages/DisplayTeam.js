import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import Box from '@material-ui/core/Box';

import DeleteIcon from '@material-ui/icons/Delete';

export default function DisplayTeam() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem("auth-token");
        const url = "http://localhost:5000/players";
        console.log("THE TOKEN:");
        console.log(token);

        axios.get(`${url}/allauth`, {
            headers: {
                "Authorization": token
            }
        })
            .then( response => setPlayers(response.data))
            .catch( error => console.log(error));
    }, []);

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
        <>
        {players ? (
        <>
        <h1>Your team</h1>
        {players.map(player => {
            const { _id, name, position, number } = player;
            return (
                <Card key={player._id} variant="outlined" className={`${classes.pos} ${classes.root}`}>
                <CardContent style={{backgroundColor: "#F4F4F4"}}>
                    <Typography variant="h6" component="h2">
                        {name}
                    </Typography>
                    <Typography color="textSecondary">
                        {position}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {number}
                    <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Edit player</Button>
                    <Button size="small"><DeleteIcon/></Button>
                </CardActions>
                </Card>
            )
        })}
        </>
    ) : (
        <CircularProgress/>
    )}
    </>
  );
}