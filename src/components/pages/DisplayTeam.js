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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CircularProgress } from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DisplayTeam(props) {

    const [players, setPlayers] = useState([]);
    const [openSort, setOpenSort] = useState(false);

    const {myTeam, myId } = props;

    useEffect(() => {
        getPlayers();
    }, []);

    const getPlayers = async () => {
        let token = localStorage.getItem("auth-token");
        const url = "http://localhost:5000/players";

        axios.get(`${url}/allauth`, {
            headers: {
                "Authorization": token
            }
        })
            .then( response => setPlayers(response.data))
            .catch( error => console.log(error));
    }

    const handleUpdate = () => {
        getPlayers();
    }

    const handleCloseSort = () => {
        setOpenSort(false);
      };
      const handleOpenSort = () => {
        setOpenSort(true);
      };

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
        <div className="pageTitle"><h1>My team</h1></div>
            <Typography variant="body2">
               Below, is a list of all {myTeam} players. You can only edit or delete players that you have created. 
               <br></br>
               <br></br>
               <Typography variant="body2" color="textSecondary">
                Sort players
                </Typography>
                <form>
                <FormControl className={classes.formControl}>
                    <Select
                    variant="outlined"
                    id="register-player-position"
                    open={openSort}
                    onClose={handleCloseSort}
                    onOpen={handleOpenSort}
                    defaultValue={"Date Created"}
                    value={"test"}
                    >
                    <MenuItem value={"DateCreated"}>Date Created</MenuItem>
                    <MenuItem value={"Name"}>Name</MenuItem>
                    </Select>
                </FormControl>
                </form>

            </Typography>
            {players ? (
                <>
                {players.map(player => {
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
                                        <Tooltip title="Cannot edit this player" arrow>
                                        <span>
                                            <Button 
                                            disabled
                                            size="large"
                                            >
                                                <MoreVertIcon/>
                                            </Button>
                                        </span>
                                        </Tooltip>
        
                                        <Tooltip title="Cannot delete this player" arrow>
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
                })}
                </>
            ) : (
            <CircularProgress/>)
        }
    </>
  );
}
