/*
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
    const res = await axios
    .get(`${url}/paginate/Ballymena?page=${pageNumber}&limit=2`)
    .then( res => {
        setMatches(p => [...p, ...res.data.results])
        setLoading(false)
        setLoadMoreData(true)
    });
};

useEffect(() => {
    upcomingMatches(pageNumber);
},[pageNumber])

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
    <div >
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
    
      <div>
      {loading && 
      <Typography align="center" variant="body2">
        <CircularProgress />
      </Typography>  
      }
      </div>

      <h3>{matches.length}</h3>

      <button onClick={loadMore} ref={pageEnd}>
        Load More
      </button>
    </div>
  );
}
*/

