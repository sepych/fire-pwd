import firebase from 'firebase/app'
import 'firebase/auth'
import {config} from "./config";

let activeTabId = null;
let extensionTabId = null;
let activeUser = undefined;

chrome.runtime.onInstalled.addListener((details) => {
  console.log('[background.js] onInstalled', details);
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('[background.js] onConnect', port)
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[background.js] onStartup')
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

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
  console.log('[background.js] onSuspend')
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
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
  });
};
