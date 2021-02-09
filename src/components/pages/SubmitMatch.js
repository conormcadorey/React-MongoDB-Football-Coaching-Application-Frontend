import React, { useState } from 'react';
//import axios from "axios";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

export default function EditPlayerDialog(props) {

  //props
  const { myGoals, oppGoals, myTeam, oppTeam } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let token = localStorage.getItem("auth-token");
  const url = "http://localhost:5000/players";

  const saveMatch = async (e) => {
    e.preventDefault();
    try {
      /*
      await axios.delete(`${url}/delete/${id}`, {
        headers: {
            "Authorization": token,
        }
      })
      .then(res => {
        console.log("player deleted")
        onUpdate();
        setOpen(false)
      })
      */
    } catch (err) {
      console.log(err)
    }
  }

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
        <DialogTitle><h2>End this match?</h2></DialogTitle>
        <DialogContent align="center">
            <Typography variant="body2" color="textSecondary">
                This match will be saved under your previous fixtures. 
                <br></br>
                {myTeam} : {myGoals} | {oppGoals} : {oppTeam}
            </Typography>
            <form onSubmit={saveMatch}>
            <div className="deletePlayerButton">
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    disableElevation
                    >
                        SAVE MATCH 
                </Button>
            </div>
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}