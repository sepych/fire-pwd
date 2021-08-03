import firebase from 'firebase/app'
import 'firebase/auth'
import {config} from "./config";

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Landing} from "./views/Landing";
import {TabSignIn} from "./views/TabSignIn";
import {Main} from "./views/Main";
import {CREDENTIALS_VIEW, LOGIN_VIEW, SAVE_PASSWORD_VIEW} from "./actions";
import {SavePasswordDialog} from "./views/SavePasswordDialog";
import {CredentialsDialog} from "./views/CredentialsDialog";


firebase.initializeApp(config);

const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // subscribe to user state changes
    const observer = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    if (window.location.hash == LOGIN_VIEW) {
      if (!user) {
        // start login process automatically
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
      }
    }

    return () => {
      // unsubscribe during unmount
      observer();
    };
  }, []); // doesn't depends on anything so passing an empty array

  if (!user) {
    if (user === undefined) {
      //TODO show loading screen
      return <div/>;
    } else {
      if (window.location.hash === LOGIN_VIEW) {
        return <TabSignIn/>;
      } else {
        return <Landing/>;
      }
    }
  } else {
    switch (window.location.hash) {
      case LOGIN_VIEW: //user logged in
        return <div/>;
      case SAVE_PASSWORD_VIEW:
        return <SavePasswordDialog></SavePasswordDialog>;
      case CREDENTIALS_VIEW:
        return <CredentialsDialog></CredentialsDialog>;
      default:
        return <Main user={user}></Main>;
    }
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));


