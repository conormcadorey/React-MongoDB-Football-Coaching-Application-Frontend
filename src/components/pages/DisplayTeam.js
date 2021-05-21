import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

import Zoom from 'react-reveal/Zoom';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function DisplayTeam(props) {

    const [players, setPlayers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(true)
    const [end, setEnd] = useState([])
    //const [error, setError] = useState();

    const {myTeam, myId } = props;

    let token = localStorage.getItem("auth-token");
    const url = "http://localhost:5000/players";

    useEffect(() => {
        getPlayers(pageNumber);
    },[pageNumber])

    const getPlayers = async (pageNumber) => {
        setLoading(true)
        try {
            await axios
            .get(`${url}/paginate/${myTeam}?page=${pageNumber}&limit=5`, {
                headers: {
                    "Authorization": token
                }
            })
            .then( res => {
                setPlayers(p => [...p, ...res.data.results])
                setLoading(false)
                setEnd(res.data.results)
            });
        } catch(err) {
            console.error(err);
        }
    };

    const handleUpdate = () => {
        players.length = 0;
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
        {players.length > 0 ? (
        <>
        <InfiniteScroll 
            dataLength={players.length} 
            next={() => 
                setPageNumber(pageNumber + 1)
            } 
            hasMore={true}
            >
        {players.map(player => {
            const { name, position, number, _id, userId } = player || {};
            return (
                <Zoom>
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
                            <EditPlayerDialog 
                                name={name} 
                                position={position} 
                                number={number} 
                                id={_id} 
                                onUpdate={() => handleUpdate()}
                            />
                            <DeletePlayerDialog 
                                name={name} 
                                id={_id} 
                                players={players}
                                onUpdate={(id) => {
                                    const newPlayers = players.filter(player => player._id !== id)
                                    setPlayers(newPlayers)
                                }}
                            />
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
            </Zoom>
            )
        })}
        </InfiniteScroll>

        <Card variant="outlined" style={{backgroundColor: "#FFF", padding: "1rem", marginBottom: "1rem"}}>
            {!loading && 
            <Typography align="center" variant="body2">
                {players.length} players
            </Typography>  
            }

            {loading && 
            <Typography align="center" variant="body2">
                <CircularProgress />
            </Typography>  
            }

            {end.length === 0 && 
            <Typography align="center" variant="body2">
                End of results
            </Typography>  
            }
        </Card>

        </>
        ) : (
            <Card variant="outlined" className={`${classes.pos} ${classes.root}`}>
                <CardContent pt={1} style={{backgroundColor: "#F4F4F4", padding: "2rem"}}>
                    <Typography align="center" variant="body2">
                        <CircularProgress />
                        <br></br><br></br>
                        You currently have no registered players. <Link to="/createplayer" style={{color: "black"}}>Click here to create one.</Link>
                    </Typography>   
                </CardContent>
            </Card>
        )
        }
        </>
    );
}
