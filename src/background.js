import firebase from 'firebase/app'
import 'firebase/auth'
import {config} from "./config";

chrome.runtime.onInstalled.addListener((details) => {
  console.log('[background.js] onInstalled', details);
});

chrome.runtime.onConnect.addListener((port) => {
  console.log('[background.js] onConnect', port)
});

chrome.runtime.onStartup.addListener(() => {
  console.log('[background.js] onStartup')
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
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
};
