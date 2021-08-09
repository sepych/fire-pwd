import React, {useEffect, useState} from 'react';
import {closeDialog, CredentialsDialogStyle, getCredentials, getDecryptedPassword, submitAutologin} from "../actions";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {styled, withStyles} from "@material-ui/core";
import {DialogTitle} from "../components/DialogTitle";
import {MyCard} from "../components/MyCard";
import MuiDialogContent from "@material-ui/core/DialogContent";
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';

export const DialogCard = styled(MyCard)({
  width: CredentialsDialogStyle.width,
  height: CredentialsDialogStyle.height,
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiDialogContent);

const CredentialsIcon = styled(VpnKeyTwoToneIcon)({
  color: '#f73b7d',
});

export const CredentialsDialog = () => {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    getCredentials((response) => {
      setCredentials(response);
    });
  }, []);

  const close = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      closeDialog(tabs[0].id);
    });
  }

  const loginSelected = (details) => {
    getDecryptedPassword(details.password, (response) => {
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        submitAutologin(tabs[0].id, details.login, response.password)
        closeDialog(tabs[0].id);
      });
    });
  }

  const list = credentials.map((item) => {
    return (
      <ListItem button onClick={() => {
        loginSelected(item);
      }}>
        <ListItemIcon>
          <CredentialsIcon/>
        </ListItemIcon>
        <ListItemText primary={item.login} secondary={'****************'}/>
      </ListItem>
    );
  })

  return (
    <DialogCard>
      <DialogTitle onClose={close}>
        Credentials
      </DialogTitle>
      <DialogContent>
        <List
          component="nav"
        >
          {list}
        </List>
      </DialogContent>
    </DialogCard>
  );
}
