import React, {useEffect, useState} from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import 'firebase/auth';
import {getSecretKey, LOGIN_VIEW} from "../actions";
import {Card, FormControl, Grid, TextField} from "@material-ui/core";
import {MyCard} from "../components/MyCard";
import {LogoView} from "../components/LogoView";
import CardContent from "@material-ui/core/CardContent";
import {PrimaryButton} from "../components/PrimaryButton";

export const TabSignIn = (props) => {
  const [sessionKey, setKey] = useState(undefined);
  const [encryptionKey, setEncryptionKey] = useState(undefined);
  const [pinCode, setPinCode] = useState(undefined);

  useEffect(() => {
    if (props.user) {
      getSecretKey(({secretKey}) => {
        setKey(secretKey);
      });

        if (props.user === null) {
          // start login process automatically
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
        }
    }
  });

  const manualSignIn = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(sessionKey, encryptionKey, pinCode)


  }

  if (props.user === undefined) {
    return <div></div>;
  }

  if (props.user) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: '100vh'}}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined">
            <CardContent>
              <LogoView/>
              <Typography variant="h5">
                Enter your password encryption key
              </Typography>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl margin={'normal'}>
                  <TextField id="standard-basic" label="Encryption key" type="password"
                             onInput={e => setEncryptionKey(e.target.value)}/>
                </FormControl>
                <br/>
                <FormControl margin={'normal'}>
                  <TextField id="standard-basic" label="Pin code" type="password"
                             onInput={e => setPinCode(e.target.value)}/>
                </FormControl>
                <br/>
                <PrimaryButton color="primary" type="submit">
                  Save
                </PrimaryButton>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
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
