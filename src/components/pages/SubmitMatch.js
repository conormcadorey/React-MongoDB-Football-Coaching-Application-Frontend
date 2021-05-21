import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';

export default function EditPlayerDialog(props) {

  //props
  const { myGoals, oppGoals, myTeam, oppTeam, homeAway } = props;
  const complete = "Y";
  const duration = "90";

  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let token = localStorage.getItem("auth-token");
  const url = "http://localhost:5000/match";

  const saveMatch = async (e) => {
    e.preventDefault(); 
    try {
      const newMatch = { myTeam, oppTeam, myGoals, oppGoals, homeAway, complete, duration };

      await axios.post(`${url}/submitmatch`, newMatch, {
        headers: {
            "Authorization": token
        }
    })
      history.push("/fixtures");
    } catch (err) {
      console.log(err)
    }
  }

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: '#FFF',
        '&:hover': {
            backgroundColor: '#31333b',
            color: '#FFF'
        }
    },
    submit: {
      backgroundColor: '#31333b',
      color: '#FFF',
        '&:hover': {
          backgroundColor: '#31333b',
          color: '#FFF'
      }
    }
  }));

  const classes = useStyles();

  return (
    <>
      <Button onClick={handleOpen}
      fullWidth={true}
      style={{padding: "1rem"}}
      size="large"
      >
          END MATCH 
      </Button>

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        {homeAway ? (
          <DialogTitle><h2>{myTeam} {myGoals} | {oppGoals} {oppTeam}</h2></DialogTitle>
        ) : (
          <DialogTitle><h2>{oppTeam} {oppGoals} | {myGoals} {myTeam}</h2></DialogTitle>
        )}
        <DialogContent align="center">
            <Typography variant="body2" color="textSecondary">
                This match will be saved under your Previous Fixtures         
            </Typography>
            <form onSubmit={saveMatch}>
            <div className="deletePlayerButton">
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    className={classes.submit}
                    disableElevation
                    fullWidth
                    >
                        SAVE AND END MATCH 
                </Button>
            </div>
            </form>
        </DialogContent>
        <DialogActions>
          <IconButton IconButton size="small" onClick={handleClose} className={classes.button}>
            <CloseIcon/>
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}