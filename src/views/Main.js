import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import 'firebase/auth';
import {setSecretKey} from "../actions";

export const Main = (props) => {
  const signOut = () => {
    setSecretKey(null);
    firebase.auth().signOut();
  }

  return (
    <div style={{width: '300px'}}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography>Hello {props.user.displayName}</Typography>
          <Button variant="outlined" color="secondary" onClick={signOut}>
            Sign out
          </Button>
        </Box>
      </Container>
    </div>
  )
}
