import React, { useEffect, useState } from 'react';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    position: 'relative',
    margin: 'auto',
    width: 'fit-content',
  },
  root: {
    //minWidth: 275,
  },
  pos: {
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#FFF',
      '&:hover': {
          backgroundColor: '#31333b',
          color: '#FFF'
      }
  },
  counter: {
    backgroundColor: '#00ffc0',
      '&:hover': {
        backgroundColor: '#cfcfcf',
        color: '#FFF',
        cursor: 'default',
      }
  },
}));

export default function EditPlayerDialog(props) {

  //props
  const { name, opposition, myScore, oppositionScore, homeAway, onUpdate } = props;

  let score = parseInt(myScore);
  let oppScore = parseInt(oppositionScore);

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [changeMyScore, setChangeMyScore] = useState(score);
  const [changeOppositionScore, setChangeOppositionScore] = useState(oppScore);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChangeMyScore(score);
    setChangeOppositionScore(oppScore);
  };

  const decrementMyScore = () => {
    if (changeMyScore === 0) {
      setChangeMyScore(0)
    } else {
      setChangeMyScore(changeMyScore -1)
    }
  }

  const decrementOppScore = () => {
    if (changeOppositionScore === 0) {
      setChangeOppositionScore(0)
    } else {
      setChangeOppositionScore(changeOppositionScore -1)
    }
  }

  return (
      <>
      <Tooltip title="Edit match" arrow>
        <Button 
        onClick={handleClickOpen}
        style={{ color: '#5541ba' }} 
        size="large"
        >
            <MoreVertIcon/>
        </Button>
        </Tooltip>

        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle align="center">
            {homeAway ? (
              <h2>Edit {name} v {opposition}</h2>
            ) : (
              <h2>Edit {opposition} v {name}</h2>
            )}
            
          </DialogTitle>
          <DialogContent>
          {homeAway ? (
             <div className={classes.container}>
              <Typography align="center" variant="h3" color="textSecondary" style={{padding: "2rem"}}>
                <Avatar onClick={() => setChangeMyScore(changeMyScore + 1)}  className={classes.counter}>+</Avatar> 
                  {changeMyScore}
                <Avatar onClick={() => decrementMyScore()} className={classes.counter}>-</Avatar>
              </Typography>
              <Typography align="center" variant="h3" color="textSecondary" style={{padding: "2rem"}}>
                <Avatar onClick={() => setChangeOppositionScore(changeOppositionScore + 1)} className={classes.counter}>+</Avatar> 
                  {changeOppositionScore} 
                <Avatar onClick={() => decrementOppScore()} className={classes.counter}>-</Avatar>
              </Typography>
            </div>
            ) : (
              <div className={classes.container}>
                <Typography align="center" variant="h3" color="textSecondary" style={{padding: "2rem"}}>
                <Avatar onClick={() => setChangeOppositionScore(changeOppositionScore + 1)} className={classes.counter}>+</Avatar> 
                  {changeOppositionScore} 
                <Avatar onClick={() => decrementOppScore()} className={classes.counter}>-</Avatar>
              </Typography>
              <Typography align="center" variant="h3" color="textSecondary" style={{padding: "2rem"}}>
                <Avatar onClick={() => setChangeMyScore(changeMyScore + 1)}  className={classes.counter}>+</Avatar> 
                  {changeMyScore}
                <Avatar onClick={() => decrementMyScore()} className={classes.counter}>-</Avatar>
              </Typography>
            </div>
            )}
            <Button
              fullWidth
              size="large"
            >
              SAVE CHANGES
            </Button>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={handleClose} className={classes.button}>
              <CloseIcon/>
            </IconButton>
          </DialogActions>
        </Dialog>
      </>
  );
}