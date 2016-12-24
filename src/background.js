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
      payload: {tabGroups}
    });
  });
}

chrome.browserAction.onClicked.addListener(browserActionClickedHandler);
chrome.tabs.onActivated.addListener(activeTabChangedHandler);
chrome.windows.onFocusChanged.addListener(activeTabChangedHandler);

chrome.tabs.onRemoved.addListener(() => {
  // if tabio was not activated, do nothing
  if (activeTabId === null) return;

  chrome.windows.getAll({populate: true}, tabGroups => {
    chrome.tabs.sendMessage(activeTabId, {
      event: 'tabGroupsChanged',
      payload: {tabGroups}
    });
  });
});

chrome.runtime.onMessage.addListener(({action, payload}) => {
  switch (action) {
    case 'goToTab':
      chrome.tabs.update(payload.tabId, {active: true});
      chrome.windows.update(payload.windowId, {focused: true});
      break;
    case 'closeTab':
      chrome.tabs.remove(payload.tabId);
      break;
  }
});
