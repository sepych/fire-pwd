import firebase from 'firebase/app'
import 'firebase/auth'
import {config} from "./config";

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

firebase.initializeApp(config);

const HelloWorld = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // subscribe to user state changes
    const observer = firebase.auth().onAuthStateChanged((authUser) => {
      console.log(authUser)
      setUser(authUser);
    });

    if (window.location.hash == '#login') {
      if (!user) {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
      }
    }

    return () => {
      // unsubscribe during unmount
      observer();
    };
  }, []); // doesn't depends on anything so passing an empty array

  const signIn = () => {
    chrome.tabs.create({url: "index.html#login"});
    window.close();
  }

  const signOut = () => {
    firebase.auth().signOut();
  }

  const manualSignIn = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  }

  if (user === undefined) {
    return (<div></div>);
  } else if (window.location.hash == '#login') {
    if (user) {
      chrome.tabs.getCurrent(function (tab) {
        chrome.tabs.remove(tab.id, function () {
        });
      });
      return (<div></div>);
    } else {
      return (
        <button onClick={manualSignIn}>sign</button>
      );
    }
  } else {
    if (user) {
      return (
        <div>
          <h1>Hello {user.displayName}</h1>
          <button onClick={signOut}>sign out</button>
        </div>
      );
    } else {
      return (
        <button onClick={signIn}>sign</button>
      );
    }
  }
}

ReactDOM.render(<HelloWorld/>, document.getElementById("root"));


