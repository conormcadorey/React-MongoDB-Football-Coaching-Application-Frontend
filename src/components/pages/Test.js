/*
import React, { useState } from 'react';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    //minWidth: 275,
  },
  pos: {
    marginBottom: 18,
  },
}));

export default function EditPlayerDialog(props) {

  //props
  const { name, opposition, myScore, oppositionScore, onUpdate } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [changeMyScore, setChangeMyScore] = useState("");
  const [changeOppositionScore, setChangeOppositionScore] = useState(opposition);
  const [openDrop, setOpenDrop] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setChangeMyScore("");
    setChangeOppositionScore("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDrop = () => {
    setOpenDrop(false);
  };

  const handleOpenDrop = () => {
    setOpenDrop(true);
  };


  const handleMyScoreChange = (e) => {
    setChangeMyScore(e.target.value);
  }

  const handleOppScoreChange = (e) => {
    setChangeOppositionScore(e.target.value);
  }

  return (
      <>
      <Tooltip title="Edit player" arrow>
        <Button 
        onClick={handleClickOpen}
        style={{ color: '#5541ba' }} 
        size="large"
        >
            <MoreVertIcon/>
        </Button>
        </Tooltip>

        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle><h2>Edit match v {opposition}</h2></DialogTitle>
          <DialogContent>
            <div className={classes.container}>
            <form className="editMatchInput">
              <Typography variant="body2" color="textSecondary">
                  Change your team score?
              </Typography>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      defaultValue={myScore}
                      id="change-home-score"
                      type="text"
                      onChange={handleMyScoreChange}
                  />
                  {changeMyScore ? (
                      <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                      disableElevation
                      >
                        Update Name
                      </Button>
                  ) : (
                      <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                      disableElevation
                      disabled
                      >
                        Update Name
                      </Button>
                  )}

                </form>

                <form className="editMatchInput" >
                  <Typography variant="body2" color="textSecondary">
                      Change opposition score?
                  </Typography>

                      <FormControl>
                      <Select
                      variant="outlined"
                      id="update-opposition-score"
                      open={openDrop}
                      onClose={handleCloseDrop}
                      onOpen={handleOpenDrop}
                      value={changeOppositionScore}
                      onChange={handleOppScoreChange}
                      style={{ marginTop: '0.5rem' }} 
                      >
                      {() => {
                        for (var i = 0; i < 20; i++) {
                            <MenuItem value={i}>{i}</MenuItem>
                            console.log(i)
                        } 
                      }}

                      </Select>
                      </FormControl>

                    {changeOppositionScore !== oppositionScore ? (
                      <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                      disableElevation
                      style={{ display: 'block', marginTop: '0.5rem' }} 
                      >
                        Update Position
                      </Button>
                  ) : (
                      <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                      disableElevation
                      disabled
                      style={{ display: 'block', marginTop: '0.5rem' }} 
                      >
                        Update Position
                      </Button>
                  )}
                  </form>
            </div>
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
*/

