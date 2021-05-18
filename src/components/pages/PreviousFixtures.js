import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import EditMatchDialog from "./EditMatchDialog";
import DeleteMatchDialog from "./DeleteMatchDialog";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import Zoom from 'react-reveal/Zoom';
import InfiniteScroll from 'react-infinite-scroll-component';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

export default function PreviousFixtures(props) {

const [matches, setMatches] = useState([]);
const [pageNumber, setPageNumber] = useState(1)
const [loading, setLoading] = useState(true)
const [end, setEnd] = useState([])
const { team, myId } = props;

const url = "http://localhost:5000/match";

useEffect(() => {
    previousMatches(pageNumber);
},[pageNumber])

const previousMatches = async(pageNumber) => {
    setLoading(true)
    try {
        await axios
        .get(`${url}/completed/${team}?page=${pageNumber}&limit=5`)
        .then( res => {
            setMatches(p => [...p, ...res.data.results])
            setLoading(false)
            setEnd(res.data.results)
        });
    } catch(err) {
        console.error(err);
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    pos: {
        marginBottom: 18,
    },
}));

    const classes = useStyles();

return (
    <>
        {matches.length > 0 ? (
        <>
        <InfiniteScroll 
            dataLength={matches.length} 
            next={() => 
                setPageNumber(pageNumber + 1)
            } 
            hasMore={true}
            >
        {matches.map(match => {
                const { myTeam, oppTeam, myGoals, oppGoals, homeAway, duration, createdAt, userId, _id } = match || {};
                return (
                    <Zoom>
                    <Card variant="outlined" key={match._id} className={`${classes.pos} ${classes.root}`}>
                        <CardContent pt={1} style={{backgroundColor: "#F4F4F4"}}>
                        {homeAway ? (
                            <Typography align="center" variant="h5" component="h2">
                                {myTeam} v {oppTeam}
                            </Typography>  
                        ) : (
                            <Typography align="center" variant="h5" component="h2">
                                {oppTeam} v {myTeam}
                            </Typography>  
                        )}
                            <Typography align="center" variant="body2" component="p">
                                {duration} | {moment(createdAt).format("DD/MM/YYYY")}
                            </Typography>
                        </CardContent>
                        <CardContent style={{backgroundColor: "#F4F4F4", paddingBottom: "2rem"}}>
                        {homeAway ? (
                            <Typography align="center" variant="h4" color="textSecondary">
                                {myGoals} | {oppGoals}
                            </Typography>
                        ) : (
                            <Typography align="center" variant="h4" color="textSecondary">
                                {oppGoals} | {myGoals}
                            </Typography>
                        )}
                        </CardContent>
                        <Box display="flex" justifyContent="flex-end">
                            <CardActions>
                                {userId === myId ? 
                                (
                                    <>
                                    <EditMatchDialog name={myTeam} opposition={oppTeam} myScore={myGoals} oppositionScore={oppGoals} homeAway={homeAway}/>
                                    <DeleteMatchDialog 
                                        myTeam={myTeam} 
                                        opposition={oppTeam} 
                                        id={_id}
                                    />
                                    </>
                                ) : (
                                    <>
                                    <Tooltip title="Cannot edit this match. Update your Admin privileges" arrow>
                                    <span>
                                        <Button 
                                        disabled
                                        size="large"
                                        >
                                            <MoreVertIcon/>
                                        </Button>
                                    </span>
                                    </Tooltip>
                                    <Tooltip title="Cannot delete this match. Update your Admin privileges" arrow>
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
                {matches.length} matches
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
                        You have no previous fixtures
                    </Typography>   
                </CardContent>
            </Card>
        )}
    </>
  );
}