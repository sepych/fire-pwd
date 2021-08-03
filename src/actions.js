//views
export const LOGIN_VIEW = '#login';
export const SAVE_PASSWORD_VIEW = '#save_password_dialog';
export const CREDENTIALS_VIEW = '#credentials_dialog';
export const SavePasswordDialogStyle = {
  width: '345px',
  height: '300px',
  border: 'none',
  position: 'fixed',
  top: '8px',
  left: '8px',
  'z-index': 9999999999
};
export const CredentialsDialogStyle = {
  width: '345px',
  height: '500px',
  border: 'none',
  position: 'fixed',
  top: '8px',
  left: '8px',
  'z-index': 9999999999
};

//requests and events
export const SHOW_SAVE_DIALOG = 'showSaveDialog';
export const SHOW_CREDENTIALS_DIALOG = 'showCredentialsDialog';
export const CLOSE_DIALOG = 'closeDialog';
export const SAVE_CREDENTIALS = 'saveCredentials';
export const GET_CREDENTIALS = 'getCredentials';
export const GET_SUBMIT_LOGIN = 'getSubmitLogin';
export const LOGIN_SUBMIT_EVENT = 'loginSubmit';
export const PAGE_CONTAINS_LOGIN_EVENT = 'pageContainsLoginEvent';

export const getCredentials = (responseCallback) => {
  chrome.runtime.sendMessage({
    action: GET_CREDENTIALS,
  }, responseCallback);
}

export const getSubmitLogin = (responseCallback) => {
  chrome.runtime.sendMessage({
    action: GET_SUBMIT_LOGIN,
  }, responseCallback);
}

export const loginSubmitEvent = (hostname, login, password) => {
  chrome.runtime.sendMessage({
    action: LOGIN_SUBMIT_EVENT,
    data: {
      hostname: hostname,
      login: login,
      password: password
    }
  });
}

export const pageContainsLoginEvent = (hostname) => {
  chrome.runtime.sendMessage({
    action: PAGE_CONTAINS_LOGIN_EVENT,
    data: {
      hostname: hostname,
    }
  });
}

export const showSaveDialog = (tabId) => {
  chrome.tabs.sendMessage(tabId, {
    action: SHOW_SAVE_DIALOG,
  });
}

export const showCredentialsDialog = (tabId) => {
  chrome.tabs.sendMessage(tabId, {
    action: SHOW_CREDENTIALS_DIALOG,
  });
}

export const closeDialog = (tabId) => {
  chrome.tabs.sendMessage(tabId, {
    action: CLOSE_DIALOG,
  });
}

export const saveCredentials = () => {
  chrome.runtime.sendMessage({
    action: SAVE_CREDENTIALS,
  });
}
