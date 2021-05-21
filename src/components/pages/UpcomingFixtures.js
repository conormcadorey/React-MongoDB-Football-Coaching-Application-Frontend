import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DeleteMatchDialog from "./DeleteMatchDialog";

import { useDispatch } from "react-redux";
import { addOpposition } from "./../../redux/oppositionSlice";
//import { useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Zoom from 'react-reveal/Zoom';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function UpcomingFixtures(props) {

const [matches, setMatches] = useState([])
const [pageNumber, setPageNumber] = useState(1)
const [loading, setLoading] = useState(true)
const [end, setEnd] = useState([])
const { team } = props;

//redux
/*
const oppositionData = useSelector(
    (state) => state.opposition.oppositionName
);
*/

const dispatch = useDispatch();
const url = "http://localhost:5000/match";
const history = useHistory();

useEffect(() => {
    upcomingMatches(pageNumber);
},[pageNumber])

const upcomingMatches = async(pageNumber) => {
    setLoading(true)
    try {
        await axios
        .get(`${url}/paginate/${team}?page=${pageNumber}&limit=5`)
        .then( res => {
            setMatches(p => [...p, ...res.data.results])
            setLoading(false)
            setEnd(res.data.results)
        });
    } catch(err) {
        console.error(err);
    }
};

const handleClick = () => {
    history.push("/match");
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
            const { myTeam, opposition, homeAway, createdAt, _id } = match || {};
            return (
            
            <Zoom>
            <Card variant="outlined" key={match._id} className={`${classes.pos} ${classes.root}`}>
                <CardContent pt={1} style={{backgroundColor: "#F4F4F4", padding: "2rem"}}>
                    {homeAway ? (
                    <Typography align="center" variant="h5" component="h2">
                        {myTeam} v {opposition}
                    </Typography>  
                    ) : (
                    <Typography align="center" variant="h5" component="h2">
                            {opposition} v {myTeam}
                    </Typography>  
                    )}
                    <Typography align="center" variant="body2" component="p">
                        Match saved: {moment(createdAt).format("DD/MM/YYYY")}
                    </Typography>
                </CardContent>
                <Box display="flex" justifyContent="flex-end">
                <Button 
                    size="large" 
                    type="submit"
                    onClick={() => {
                        dispatch(addOpposition(opposition));
                        handleClick();
                    }}
                >
                    <Link style={{color: "#5541ba"}}><h3>START MATCH NOW</h3></Link>
                </Button >
                <DeleteMatchDialog 
                    myTeam={myTeam} 
                    opposition={opposition} 
                    id={_id} 
                    matches={matches}
                    onUpdate={(id) => {
                        const newMatches = matches.filter(match => match._id !== id)
                        setMatches(newMatches)
                    }}
                    />
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
                        You currently have no upcoming fixtures. <Link to="/" style={{color: "black"}}>Click here to create one.</Link>
                    </Typography>   
                </CardContent>
            </Card>
        )} 
    </>
    );
}

