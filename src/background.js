console.log('Hello from background.js');
console.log('chrome', chrome);

let activeTabId = null;

function activeTabChangedHandler() {
  // if tabio was not activated, do nothing
  if (activeTabId === null) return;

  chrome.tabs.sendMessage(activeTabId, {
    event: 'tabDeactivated'
  });

  activeTabId = null;
}

function browserActionClickedHandler(tab) {
  activeTabId = tab.id;

  chrome.windows.getAll({populate: true}, tabGroups => {
    chrome.tabs.sendMessage(tab.id, {
      event: 'browserActionClicked',
      payload: tabGroups
    });
  });
}

chrome.browserAction.onClicked.addListener(browserActionClickedHandler);
chrome.tabs.onActivated.addListener(activeTabChangedHandler);
chrome.windows.onFocusChanged.addListener(activeTabChangedHandler);
