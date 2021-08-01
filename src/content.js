import $ from 'jquery';
import {CLOSE_SAVE_DIALOG, loginSubmitEvent, PROMPT_SAVE_DIALOG} from "./actions";

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
      $(this).submit(function (event) {
        loginSubmitEvent(loginView.login.val(), loginView.password.val());
      });
      loginViews.push(loginView);
    }
  });
});

let container = null;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == PROMPT_SAVE_DIALOG) {
    if (container !== null) {
      container.remove();
    }

    container = document.createElement("iframe");
    container.src = chrome.runtime.getURL('index.html#dialog');
    container.style.cssText = 'border:none; width:350px; height: 300px; position:fixed; top:0; left:0; z-index:9999999999;';
    document.body.appendChild(container);

    console.log(request)
  } else if (request.action == CLOSE_SAVE_DIALOG) {
    if (container !== null) {
      container.remove();
    }
  }
});
