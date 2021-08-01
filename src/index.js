import firebase from 'firebase/app'
import 'firebase/auth'
import {config} from "./config";

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Landing} from "./views/Landing";
import {TabSignIn} from "./views/TabSignIn";
import {Main} from "./views/Main";
import {closeSaveDialog} from "./actions";


firebase.initializeApp(config);

const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // subscribe to user state changes
    const observer = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    if (window.location.hash == '#login') {
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
      if (window.location.hash == '#login') {
        return <TabSignIn/>;
      } else {
        return <Landing/>;
      }
    }
  } else {
    if (window.location.hash == '#login') {
      //user logged in
      return <div/>;
    } else if (window.location.hash == '#dialog') {
      // for future
      return (
        <>
          <h1>Dialog view</h1>
          <button onClick={() => {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
              closeSaveDialog(tabs[0].id);
            });
          }}
          >
            close
          </button>
        </>
      );
    } else {
      return <Main user={user}></Main>;
    }
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));


