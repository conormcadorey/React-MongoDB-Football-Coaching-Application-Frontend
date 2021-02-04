import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

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

    const handleDelete = () => {
        alert("permanently delete this player? You cannot undo this action!");
      }

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
    //add RedirectLogin component
    //add delete/edit functionality

    return (
        <>
        <h1>Your team</h1>
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
                            <Tooltip title="Edit player" arrow>
                                <Button style={{ color: 'blue' }} size="large"><MoreVertIcon/></Button>
                            </Tooltip>
                            <Tooltip title="Delete player" arrow>
                                <Button onClick={handleDelete} size="large"><DeleteIcon/></Button>
                            </Tooltip> 
                        </CardActions>
                    </Box>
                </Card>
            )
        })}
    </>
  );
}