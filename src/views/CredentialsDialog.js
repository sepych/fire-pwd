import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {closeDialog, CredentialsDialogStyle, getCredentials} from "../actions";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";




const useStyles = makeStyles({
  root: {
    width: CredentialsDialogStyle.width,
    height: CredentialsDialogStyle.height,
  },
});

export const CredentialsDialog = () => {
  const classes = useStyles();
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
    <Card className={classes.root}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
