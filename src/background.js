import firebase from 'firebase/app'
import 'firebase/auth'
import {config} from "./config";
import {LOGIN_SUBMIT_EVENT, promptSaveDialog, SAVE_CREDENTIALS} from "./actions";

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
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log(changeInfo)
    if (promptSavePassword) {
      promptSaveDialog(tabId);
      promptSavePassword = false;
    }
  }
})

const onLoginSubmit = ({login, password}) => {
  // console.log(login, password)
  promptSavePassword = true;
}

firebase.initializeApp(config);
window.onload = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (activeUser === null && user && activeTabId !== null) {
      chrome.tabs.update(activeTabId, { highlighted: true });
      chrome.tabs.remove(extensionTabId);
    }
    activeUser = user;
    chrome.runtime.sendMessage({context: "user", data: activeUser});
  });
};


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.action) {
      case LOGIN_SUBMIT_EVENT:
        onLoginSubmit(request.data);
        break;
      case SAVE_CREDENTIALS:
        console.log(SAVE_CREDENTIALS)
        break;
      default:
        console.log(request.action)
        break;
    }
  }
);
