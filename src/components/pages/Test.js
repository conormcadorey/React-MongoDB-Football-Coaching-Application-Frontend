import React from "react";

export default function Test() {

    return(
        <h1>TEST</h1>
    )
}

/*
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
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DisplayTeam(props) {

    const [players, setPlayers] = useState([]);
    //const [error, setError] = useState();

    const {myTeam, myId } = props;

    useEffect(() => {
        getPlayers();
    }, []); 

    const getPlayers = async () => {
        try {
            let token = localStorage.getItem("auth-token");
            const url = "http://localhost:5000/players";

            await axios.get(`${url}/allauth/${myTeam}`, {
                headers: {
                    "Authorization": token
                }
            })
            .then( response => setPlayers(response.data))
        } catch (err) {
            //err.response.data.msg && setError(err.response.data.msg);
        }      
    }

    const handleUpdate = () => {
        getPlayers();
    }

    const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    pos: {
        marginBottom: 18,
    },
    formControl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        minWidth: 120,
        },
    }));

    const classes = useStyles();

    return (
        <>
            {players ? (
                <>
                {(players.length === 0) ? 
                    (
                        <p>You currently have no players. Click here to start building your team!</p>
                    ) : (
                        players.map(player => {
                            const { name, position, number, _id, userId } = player || {};
                            return (
                                <Card variant="outlined" key={player._id} className={`${classes.pos} ${classes.root}`}>
                                    <Box display="flex" pt={1} style={{backgroundColor: "#F4F4F4"}}>
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
                                            {userId === myId ? 
                                            (
                                                <>
                                                <EditPlayerDialog name={name} position={position} number={number} id={_id} onUpdate={() => handleUpdate()}/>
                                                <DeletePlayerDialog name={name} id={_id} onUpdate={() => handleUpdate()}/>
                                                </>
                                            ) : (
                                                <>
                                                <Tooltip title="Cannot edit this player. Update your Admin privileges" arrow>
                                                <span>
                                                    <Button 
                                                    disabled
                                                    size="large"
                                                    >
                                                        <MoreVertIcon/>
                                                    </Button>
                                                </span>
                                                </Tooltip>
                
                                                <Tooltip title="Cannot delete this player. Update your Admin privileges" arrow>
                                                <span>
                                                    <Button disabled size="large">
                                                        <DeleteIcon/>
                                                    </Button>
                                                </span>
                                                </Tooltip> 
                                                </>
                                            )}   
                                        </CardActions>
                                    </Box>
                                </Card>
                            )
                        })
                    )
                }
                </>
            ) : (
                <CircularProgress />
            )
            }
        </>
    );
}
*/



/*
    const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
            if (token === null) {
            localStorage.setItem("auth-token", ""); 
            token = "";
        }
        //if a token exists axios returns response as a json object
        //next check if the token is valid 
        const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: {"x-auth-token": token } }
        );

        if (tokenRes.data) {
            const userRes = await Axios.get("http://localhost:5000/users/", 
            {headers: {"x-auth-token": token },})
            .then( res => {
                setUserData({
                    token,
                    user: userRes.data,
                    isLoggedIn: true,
                    isLoading: false
                })
            })
            .catch( error => console.log("NO USER"));
            }
    };
    */

