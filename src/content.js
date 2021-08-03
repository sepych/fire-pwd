import $ from 'jquery';
import {
  CLOSE_DIALOG, CREDENTIALS_VIEW,
  loginSubmitEvent,
  pageContainsLoginEvent,
  SHOW_SAVE_DIALOG, SAVE_PASSWORD_VIEW,
  SHOW_CREDENTIALS_DIALOG
} from "./actions";

const loginViews = [];
$(document).ready(function () {
  console.log('[content.js] document ready');
  const possibleLoginForms = $('input[type=password]').closest('form');

  possibleLoginForms.each(function () {
    const passwords = $(this).find('input[type=password]');
    const logins = $(this).find('input[type=text]');

    if (passwords.length === 1 && logins.length === 1) {
      const loginView = {
        form: $(this),
        login: logins.first(),
        password: passwords.first()
      }
      $(this).submit(function () {
        loginSubmitEvent(window.location.hostname, loginView.login.val(), loginView.password.val());
      });
      loginViews.push(loginView);
    }
  });
  if (loginViews.length > 0) {
    pageContainsLoginEvent(window.location.hostname);
  }
});

let container = null;
const removeContainer = () => {
  if (container !== null) {
    container.remove();
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case CLOSE_DIALOG:
      removeContainer();
      break;
    case SHOW_SAVE_DIALOG:
      removeContainer();
      container = document.createElement("iframe");
      container.src = chrome.runtime.getURL('index.html' + SAVE_PASSWORD_VIEW);
      container.style.cssText = 'border:none; width:350px; height: 300px; position:fixed; top:0; left:0; z-index:9999999999;';
      document.body.appendChild(container);
      break;
    case SHOW_CREDENTIALS_DIALOG:
      removeContainer();
      container = document.createElement("iframe");
      container.src = chrome.runtime.getURL('index.html' + CREDENTIALS_VIEW);
      container.style.cssText = 'border:none; width:350px; position:fixed; top:0; left:0; z-index:9999999999;';
      document.body.appendChild(container);
      break;
  }
});
