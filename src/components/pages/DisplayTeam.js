import React, { useState, useEffect } from "react";
import axios from "axios";

import EditPlayerDialog from "./EditPlayerDialog";
import DeletePlayerDialog from "./DeletePlayerDialog";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

export default function DisplayTeam() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem("auth-token");
        const url = "http://localhost:5000/players";

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
          //minWidth: 275,
        },
        pos: {
          marginBottom: 18,
        },
      });

    const classes = useStyles();
    /////////////////////////

    //TODO
    //create seperate component for player card 
    //add loading dialogue when fetching cards from db

    return (
        <>
        <div className="pageTitle"><h1>My team</h1></div>
        {players.map(player => {
            const { name, position, number } = player;
            return (
                <Card variant="outlined" key={player._id} className={`${classes.pos} ${classes.root}`}>
                    <Box display="flex" p={1, 0} style={{backgroundColor: "#F4F4F4"}}>
                        <Box p={1} flexGrow={1}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {name}   
                                </Typography>
                                <Typography color="textSecondary">
                                    Position | {position} 
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Number | {number} 
                                <br />
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box p={1}>
                            <CardContent>
                                <Avatar src="/broken-image.jpg" style={{ height: '70px', width: '70px' }}/>
                            </CardContent>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <CardActions>
                                <EditPlayerDialog name={name} position={position} number={number}/>
                                <DeletePlayerDialog name={name}/>
                        </CardActions>
                    </Box>
                </Card>
            )
        })}
    </>
  );
}