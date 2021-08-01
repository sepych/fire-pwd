import firebase from 'firebase/app'
import 'firebase/auth'
import {config} from "./config";

let activeTabId = null;
let extensionTabId = null;
let activeUser = undefined;
let onCompleteMessage = null;

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
    if (onCompleteMessage !== null) {
      chrome.tabs.sendMessage(tabId, onCompleteMessage);
      onCompleteMessage = null;
    }
  }
})

const onLoginSubmit = ({login, password}) => {
  // console.log(login, password)
  onCompleteMessage = {
    action: 'promptSaveDialog',
    data: {login, password}
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == 'getUser') {
      sendResponse({user: activeUser});
    } else if(request.action == 'loginSubmit') {
      // login submit received
      onLoginSubmit(request.data);
    }
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension", request);
  }
);

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
