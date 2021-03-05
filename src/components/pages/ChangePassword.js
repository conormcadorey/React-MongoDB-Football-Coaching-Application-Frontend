import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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

export default function ChangePassword() {

    const [openPass, setOpenPass] = useState(false);
    const [currentPass, setCurrentPass] = useState("");

    const handlePassOpen = () => {
        setOpenPass(true);
      };
    
      const handlePassClose = () => {
        setOpenPass(false);
      };

      const handleCurrentPass = () => {
          setCurrentPass(currentPass)
      }

      const classes = useStyles();

    return (
        <>
            <Button 
            onClick={handlePassOpen}
            style={{ color: 'blue' }} 
            size="large"
            >
                TEST
            </Button>

            <Dialog disableBackdropClick disableEscapeKeyDown open={openPass} onClose={handlePassClose}>
          <DialogTitle><h2>Change password?</h2></DialogTitle>
          <DialogContent>
            <div className={classes.container}>
            <form className="changePassword">
              <Typography variant="body2" color="textSecondary">
                  Enter your existing password
              </Typography>
                  <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      defaultValue={currentPass}
                      id="existing-password"
                      type="password"
                      onChange={handleCurrentPass}
                  />
                <Typography variant="body2" color="textSecondary">
                  Enter your new password. It must be at least 8 characters in length
                </Typography>
                <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="new-password"
                      type="password"
                  />
                <Typography variant="body2" color="textSecondary">
                  Confirm your new password
                </Typography>
                <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="new-password-confirm"
                      type="password"
                  />
                  {currentPass ? (
                      <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                      disableElevation
                      >
                        Update Password
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
                        Update Password
                      </Button>
                  )}

                </form>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePassClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        </>
    );
}