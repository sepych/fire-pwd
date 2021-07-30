import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const HelloWorld = () => {
  const mystyle = {
    zIndex: 9999,
    position: 'fixed',
    top: 0,
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };
  return (
    <h1 style={mystyle}>
      Hello World
    </h1>
  );
}

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

  const container = document.createElement("div");
  ReactDOM.render(<HelloWorld/>, container);
  $('body').append(container);
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
