import $ from 'jquery';
import {
  CLOSE_DIALOG, CREDENTIALS_VIEW,
  loginSubmitEvent,
  pageContainsLoginEvent,
  SHOW_SAVE_DIALOG, SAVE_PASSWORD_VIEW,
  SHOW_CREDENTIALS_DIALOG,
  CredentialsDialogStyle, SavePasswordDialogStyle, SUBMIT_AUTOLOGIN
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

const submitLogin = (login, password) => {
  loginViews.forEach((item) => {
    item.login.val(login);
    item.password.val(password);
  })
}

let container = null;
const removeContainer = () => {
  if (container !== null) {
    container.remove();
  }
}

const getTextStyle = (style) => {
  return Object.entries(style).map(([k, v]) => `${k}:${v}`).join(';');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[content.js]', request);
  switch (request.action) {
    case CLOSE_DIALOG:
      removeContainer();
      break;
    case SHOW_SAVE_DIALOG:
      removeContainer();
      container = document.createElement("iframe");
      container.src = chrome.runtime.getURL('index.html' + SAVE_PASSWORD_VIEW);
      container.style.cssText = getTextStyle(SavePasswordDialogStyle);
      document.body.appendChild(container);
      break;
    case SHOW_CREDENTIALS_DIALOG:
      removeContainer();
      container = document.createElement("iframe");
      container.src = chrome.runtime.getURL('index.html' + CREDENTIALS_VIEW);
      container.style.cssText = getTextStyle(CredentialsDialogStyle);
      document.body.appendChild(container);
      break;
    case SUBMIT_AUTOLOGIN:
      submitLogin(request.data.login, request.data.password);
      break;
  }
});
