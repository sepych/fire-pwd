import React from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import 'firebase/auth';

export const TabSignIn = () => {
  const manualSignIn = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  }

  return (
    <div style={{width: '800px', margin: "auto"}}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Button variant="outlined" color="secondary" onClick={manualSignIn}>
            Sign in with Google
          </Button>
        </Box>
      </Container>
    </div>
  )
}
