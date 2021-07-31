import $ from 'jquery';

$(document).ready(function () {
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
          login: loginView.login.val(),
          password: loginView.password.val()
        }, function (response) {
          console.log(response);
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


// let counter = 0;
// const messagesFromReactAppListener = (
//   message,
//   sender,
//   response
// ) => {
//   response("Message id " + counter);
//   console.log(message);
//   console.log(loginViews);
//   counter++;
// }
// chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
