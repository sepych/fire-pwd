
export const LOGIN_SUBMIT_EVENT = 'loginSubmit';
export const PROMPT_SAVE_DIALOG = 'promptSaveDialog';
export const CLOSE_SAVE_DIALOG = 'closeSaveDialog';
export const SAVE_CREDENTIALS = 'saveCredentials';

export const loginSubmitEvent = (login, password) => {
  chrome.runtime.sendMessage({
    action: LOGIN_SUBMIT_EVENT,
    data: {
      login: login,
      password: password
    }
  });
}

export const promptSaveDialog = (tabId) => {
  chrome.tabs.sendMessage(tabId, {
    action: PROMPT_SAVE_DIALOG,
  });
}

export const closeSaveDialog = (tabId) => {
  chrome.tabs.sendMessage(tabId, {
    action: CLOSE_SAVE_DIALOG,
  });
}

export const saveCredentials = () => {
  chrome.runtime.sendMessage({
    action: SAVE_CREDENTIALS,
  });
}
