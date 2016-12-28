console.log('Hello from background.js');
console.log('chrome', chrome);

let activeTabId = null;

chrome.browserAction.onClicked.addListener(browserActionClickedHandler);
chrome.tabs.onRemoved.addListener(tabRemovedHandler);
chrome.tabs.onActivated.addListener(activeTabChangedHandler);
chrome.windows.onFocusChanged.addListener(activeTabChangedHandler);
chrome.runtime.onMessage.addListener(messageHandler);

function browserActionClickedHandler(tab) {
  activeTabId = tab.id;

  chrome.windows.getAll({populate: true}, tabGroups => {
    chrome.tabs.sendMessage(tab.id, {
      event: 'browserActionClicked',
      payload: {tabGroups}
    });
  });
}

function tabRemovedHandler(tabId, removeInfo) {
  // if tabio was not activated, do nothing
  if (activeTabId === null) return;

  chrome.windows.getAll({populate: true}, tabGroups => {
    chrome.tabs.sendMessage(activeTabId, {
      event: 'tabRemoved',
      payload: {
        tabId,
        windowId: removeInfo.windowId, 
        tabGroups
      }
    });
  });
}

function activeTabChangedHandler() {
  // if tabio was not activated, do nothing
  if (activeTabId === null) return;

  chrome.tabs.sendMessage(activeTabId, {
    event: 'tabDeactivated'
  });

  activeTabId = null;
}

function messageHandler({action, payload}) {
  switch (action) {
    case 'goToTab':
      chrome.tabs.update(payload.tabId, {active: true});
      chrome.windows.update(payload.windowId, {focused: true});
      break;
    case 'closeTab':
      chrome.tabs.remove(payload.tabId);
      break;
  }
}
