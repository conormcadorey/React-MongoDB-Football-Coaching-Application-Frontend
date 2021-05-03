import React from 'react';
import axios from "axios";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';

export default function DeleteMatchDialog(props) {

  //props
  const { id, onUpdate } = props;

  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let token = localStorage.getItem("auth-token");
  const url = "http://localhost:5000/match";

  const deleteMatch = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${url}/delete/${id}`, {
        headers: {
            "Authorization": token,
        }
      })
      .then(res => {
        console.log("Match deleted")
        onUpdate();
        setOpen(false)
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <Tooltip title="Delete Match" arrow>
         <Button onClick={handleDelete} size="large"><DeleteIcon/></Button>
     </Tooltip> 

      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle><h2>Delete match?</h2></DialogTitle>
        <DialogContent align="center">
            <Typography variant="body2" color="textSecondary">
                Permanently delete this match? You cannot undo this action!
            </Typography>
            <form onSubmit={deleteMatch}>
            <div className="deleteMatchButton">
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    disableElevation
                    >
                        Delete 
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