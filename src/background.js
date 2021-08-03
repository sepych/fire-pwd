import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import {config} from "./config";
import {
  LOGIN_SUBMIT_EVENT,
  PAGE_CONTAINS_LOGIN_EVENT,
  showSaveDialog,
  SAVE_CREDENTIALS,
  GET_CREDENTIALS, showCredentialsDialog, GET_SUBMIT_LOGIN
} from "./actions";

import AES from 'crypto-js/aes';

let activeTabId = null;
let extensionTabId = null;
let activeUser = undefined;
let promptSavePassword = false;

chrome.runtime.onInstalled.addListener((details) => {
  console.log('[background.js] onInstalled', details);
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('[background.js] onConnect', port)
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[background.js] onStartup')
});

chrome.runtime.onSuspend.addListener(() => {
  console.log('[background.js] onSuspend')
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log('[background.js] tabs onActivated', activeInfo);
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    const activeTab = tabs[0];
    console.log(activeTab, chrome.runtime.id)
    if (activeTab.url.length > 0) {
      if (!activeTab.url.includes(chrome.runtime.id)) {
        activeTabId = activeInfo.tabId;
      } else {
        extensionTabId = activeInfo.tabId;
      }
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    console.log(changeInfo)
    if (promptSavePassword) {
      showSaveDialog(tabId);
      promptSavePassword = false;
    }
  }
})


const app = firebase.initializeApp(config);
const db = firebase.firestore(app);

window.onload = function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (activeUser === null && user && activeTabId !== null) {
      chrome.tabs.update(activeTabId, {highlighted: true});
      chrome.tabs.remove(extensionTabId);
    }
    activeUser = user;
    chrome.runtime.sendMessage({context: "user", data: activeUser});
  });
};

let loginCredentials = null;
const onLoginSubmit = ({hostname, login, password}) => {
  console.log(hostname, login, password)
  loginCredentials = {hostname, login, password};
  promptSavePassword = true;
}

const saveCredentials = () => {
  const passwordRef = db.collection('users').doc(activeUser.uid)
  .collection('hosts').doc(loginCredentials.hostname).collection('logins')
  .doc(loginCredentials.login);

  passwordRef.set({
    hostname: loginCredentials.hostname,
    login: loginCredentials.login,
    password: AES.encrypt(loginCredentials.password, 'secret key 123').toString()
  }).then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
}

let currentCredentials = { data: []};
const checkForExistingCredentials = ({hostname}) => {
  currentCredentials.hostname = hostname;
  currentCredentials.data = [];

  const loginsRef = db.collection('users').doc(activeUser.uid)
  .collection('hosts').doc(hostname).collection('logins');
  loginsRef.get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      currentCredentials.data.push(doc.data());
    });

  })
  .catch((error) => {
    console.error("Error writing document: ", error);
  })
  .finally(() => {
    if (currentCredentials.data.length > 0) {
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        showCredentialsDialog(tabs[0].id);
      });
    }
  })


}


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log('[background.js]', request);
    switch (request.action) {
      case LOGIN_SUBMIT_EVENT:
        onLoginSubmit(request.data);
        break;
      case SAVE_CREDENTIALS:
        saveCredentials();
        break;
      case PAGE_CONTAINS_LOGIN_EVENT:
        checkForExistingCredentials(request.data);
        break;
      case GET_CREDENTIALS:
        sendResponse(currentCredentials.data);
        break;
      case GET_SUBMIT_LOGIN:
        sendResponse({
          login: loginCredentials.login,
          password: loginCredentials.password.replace(/./g, '*')
        })
        break;
    }
  }
);
