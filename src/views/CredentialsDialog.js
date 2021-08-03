import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {closeDialog, getCredentials} from "../actions";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
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
    console.log(details)
  }

  const list = credentials.map((item) => {
    return (
      <ListItem button onClick={() => {
        loginSelected(item);
      }}>
        <ListItemIcon>
          <SendIcon/>
        </ListItemIcon>
        <ListItemText primary={item.login}/>
      </ListItem>
    );
  })

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      {list}
    </List>
  );
}
