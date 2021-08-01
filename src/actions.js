export const getUser = (callback) => {
  chrome.runtime.sendMessage({action: "getUser"}, function(response) {
    callback(response.user);
    console.log(response);
  });
}

export const openAuthPopup = () => {
  chrome.runtime.sendMessage({action: "openAuthPopup"});
}
