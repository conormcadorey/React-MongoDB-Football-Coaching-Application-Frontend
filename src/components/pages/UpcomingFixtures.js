import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DeleteMatchDialog from "./DeleteMatchDialog";

import { useDispatch } from "react-redux";
import { addOpposition } from "./../../redux/oppositionSlice";
import { useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function UpcomingFixtures(props) {

const [matches, setMatches] = useState([])
const [pageNumber, setPageNumber] = useState(1)
const [loading, setLoading] = useState(true)
const [loadMoreData, setLoadMoreData] = useState(false)
const [update, setUpdate] = useState(false)
const { team } = props;

//redux
const oppositionData = useSelector(
    (state) => state.opposition.oppositionName
);

const dispatch = useDispatch();
const url = "http://localhost:5000/match";
const history = useHistory();
const pageEnd = useRef();
let num = 1;

const upcomingMatches = async(pageNumber) => {
    setLoading(true)
    try {
        await axios
        .get(`${url}/paginate/${team}?page=${pageNumber}&limit=5`)
        .then( res => {
            setMatches(p => [...p, ...res.data.results])
            setLoading(false)
            setLoadMoreData(true)
        });
    } catch(err) {
        console.error(err);
    }
};

useEffect(() => {
    upcomingMatches(pageNumber);
},[pageNumber, update])

const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
}

useEffect(() => {
    if(loadMoreData){
        const observer = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            num++;
            loadMore();
            if(num >= 10){
            observer.unobserve(pageEnd.current)
            }
        }
        },{threshold: 1});
        observer.observe(pageEnd.current)
    }
},[loadMoreData,num])

/////////////////////////////////////////////////////////////////

const handleClick = () => {
    history.push("/match");
};

const handleUpdate = () => {
    setUpdate(() => !update);
}

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
    <div className="pageTitle"><h1>Upcoming fixtures</h1></div>
    <Typography variant="body2">
        Below, are all of your upcoming saved fixtures. Just select from a fixture to begin a new match instantly! 
        <br></br><br></br>
    </Typography>
    {matches.length > 0 ? (
        <>
        {matches.map(match => {
            const { myTeam, opposition, homeAway, createdAt, _id } = match || {};
            return (
            <div className="cardAnimate">
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
                    size="medium" 
                    type="submit"
                    onClick={() => {
                        dispatch(addOpposition(opposition));
                        handleClick();
                    }}
                >
                    <Link style={{color: "#3e5096"}}><h3>START MATCH NOW</h3></Link>
                </Button>
                <Button size="large"
                    type="submit"
                >
                    <DeleteMatchDialog 
                        myTeam={myTeam} 
                        opposition={opposition} 
                        id={_id} 
                        onUpdate={() => handleUpdate()}/>
                </Button>
                </Box>
            </Card>
            </div>  
            )
        })}

        {!loading && 
        <Typography align="center" variant="body2">
            {matches.length} matches displayed. 
            <br></br>
            <Button 
            onClick={loadMore} ref={pageEnd}
            size="small" 
            >
                Load More
            </Button>
        </Typography>  
        }
        {loading && 
        <Typography align="center">
            <CircularProgress />
        </Typography>  
        }
        </>
        ) : (
            <Card variant="outlined" className={`${classes.pos} ${classes.root}`}>
                <CardContent pt={1} style={{backgroundColor: "#F4F4F4", padding: "2rem"}}>
                    <Typography align="center" variant="body2">
                        <CircularProgress />
                        <br></br><br></br>
                        You currently have no upcoming fixtures. <Link>Click here to create one.</Link>
                    </Typography>   
                </CardContent>
            </Card>
        )} 
    </>
    );
}

/*
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DeleteMatchDialog from "./DeleteMatchDialog";

import { useDispatch } from "react-redux";
import { addOpposition } from "./../../redux/oppositionSlice";
import { useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import InfiniteScroll from 'react-infinite-scroll-component';

export default function UpcomingFixtures(props) {

const [matches, setMatches] = useState([]);
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const { team } = props;

//redux
const oppositionData = useSelector(
    (state) => state.opposition.oppositionName
);

const dispatch = useDispatch();
const url = "http://localhost:5000/match";
const history = useHistory();

useEffect(() => {
    upcomingMatches();
}, [])

const upcomingMatches = async () => {
    try {
        await axios
        .get(`${url}/upcomingmatches/${team}`)
        .then( res => {
            setMatches(res.data);
        });
    setLoading(true);

    } catch(err) {
        console.error(err);
    }
}

const handleClick = () => {
    history.push("/match");
};

const handleUpdate = () => {
    upcomingMatches();
}

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
    <div className="pageTitle"><h1>Upcoming fixtures</h1></div>
    <Typography variant="body2">
        Below, are all of your upcoming saved fixtures. Just select from a fixture to begin a new match instantly! 
        <br></br><br></br>
    </Typography>
    {loading ? (
    <>
        {matches.length > 0 ? 
            (<InfiniteScroll dataLength={matches.length} next={() => setPage(page + 1)} hasMore={true}> 
            {matches.map(match => {
                const { myTeam, opposition, homeAway, createdAt, _id } = match || {};
                return (
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
                            size="medium" 
                            type="submit"
                            onClick={() => {
                                dispatch(addOpposition(opposition));
                                handleClick();
                            }}
                        >
                            <Link style={{color: "#3e5096"}}><h3>START MATCH NOW</h3></Link>
                        </Button>
                        <Button size="large"
                            type="submit"
                        >
                            <DeleteMatchDialog myTeam={myTeam} opposition={opposition} id={_id} onUpdate={() => handleUpdate()}/>
                        </Button>
                        </Box>
                    </Card>
                )
            })}
            </InfiniteScroll>
        ) : (
            <Card variant="outlined" className={`${classes.pos} ${classes.root}`}>
                <CardContent pt={1} style={{backgroundColor: "#F4F4F4", padding: "2rem"}}>
                    <Typography align="center" variant="body2">
                        <CircularProgress />
                        <br></br><br></br>
                        You currently have no upcoming fixtures. <Link>Click here to create one.</Link>
                    </Typography>   
                </CardContent>
            </Card>
        )}
    </>
        ) : (
            <Typography align="center" variant="body2">
                <CircularProgress />
            </Typography>   
        )}   
    </>
  );
}
*/