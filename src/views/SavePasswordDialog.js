import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {closeDialog, CredentialsDialogStyle, getSubmitLogin, saveCredentials} from "../actions";
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import {styled, withStyles} from "@material-ui/core";
import {PrimaryButton} from "../components/PrimaryButton";
import {SecondaryButton} from "../components/SecondaryButton";
import {MyCard} from "../components/MyCard";
import {DialogTitle} from "../components/DialogTitle";
import {Credentials} from "../components/Credentials";

export const DialogCard = styled(MyCard)({
  width: CredentialsDialogStyle.width,
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const SavePasswordDialog = () => {
  const [credentials, setCredentials] = useState({login: '', password: ''});
  useEffect(() => {
    getSubmitLogin((response) => {
      if (response.login && response.password) {
        setCredentials(response);
      }
    });
  }, []);

  const close = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      closeDialog(tabs[0].id);
    });
  }

  const save = () => {
    saveCredentials();
    close();
  }

  return (
    <DialogCard>
      <DialogTitle onClose={close}>
        New login detected
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          Save credential for this page?
        </Typography>
        <Credentials
          login={credentials.login}
          password={credentials.password}
        >
        </Credentials>
      </DialogContent>
      <DialogActions>
        <SecondaryButton color="primary" onClick={close}>
          Cancel
        </SecondaryButton>
        <PrimaryButton color="primary" onClick={save}>
          Save
        </PrimaryButton>
      </DialogActions>
    </DialogCard>
  );
}
