import $ from 'jquery';

console.log('[content.js]');
const loginViews = [];
$(document).ready(function () {
  console.log('[content.js] document ready');
  const possibleLoginForms = $('input[type=password]').closest('form');
  console.log(possibleLoginForms)

  possibleLoginForms.each(function () {
    console.log($(this))
    const passwords = $(this).find('input[type=password]');
    const logins = $(this).find('input[type=text]');
    console.log(passwords, logins)
    if (passwords.length === 1 && logins.length === 1) {
      const loginView = {
        form: $(this),
        login: logins.first(),
        password: passwords.first()
      }
      $(this).submit(function (event) {
        console.log('submit')
        console.log(loginView.login.val(), loginView.password.val())

        chrome.runtime.sendMessage({
          action: 'loginSubmit',
          data: {
            login: loginView.login.val(),
            password: loginView.password.val()
          }
        });
      });
      loginViews.push(loginView);
    }
  });

  // const container = document.createElement("iframe");
  // container.src = chrome.runtime.getURL('index.html#dialog');
  // container.style.cssText = 'position:fixed;top:0;left:0;z-index:9999999999;';
  // document.body.appendChild(container);
});

let container = null;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'promptSaveDialog') {
    if (container !== null) {
      container.remove();
    }

    container = document.createElement("iframe");
    container.src = chrome.runtime.getURL('index.html#dialog');
    container.style.cssText = 'border:none; width:300px; position:fixed; top:0; left:0; z-index:9999999999;';
    document.body.appendChild(container);

    console.log(request)
  } else if (request.action == 'closeSaveDialog') {
    if (container !== null) {
      container.remove();
    }
  }
});
