console.log('Hello from background.js');
console.log('chrome', chrome);

let activeInfo = null;

chrome.browserAction.onClicked.addListener(browserActionClickedHandler);
chrome.tabs.onRemoved.addListener(tabRemovedHandler);
chrome.tabs.onActivated.addListener(activeTabChangedHandler);
chrome.windows.onFocusChanged.addListener(focusedTabGroupChangedHandler);
chrome.runtime.onMessage.addListener(messageHandler);

function browserActionClickedHandler(tab) {
  activeInfo = {
    tabId: tab.id,
    tabGroupId: tab.windowId
  };

  chrome.windows.getAll({populate: true}, tabGroups => {
    chrome.tabs.sendMessage(activeInfo.tabId, {
      event: 'browserActionClicked',
      payload: {tabGroups}
    });
  });
}

function tabRemovedHandler(tabId, {windowId}) {
  // if tabio was not activated, do nothing
  if (activeInfo === null) return;

  chrome.windows.getAll({populate: true}, tabGroups => {
    chrome.tabs.sendMessage(activeInfo.tabId, {
      event: 'tabRemoved',
      payload: {
        tabId,
        tabGroupId: windowId,
        tabGroups
      }
    });
  });
}

function activeTabChangedHandler({windowId}) {
  // if tabio was not activated or if active tab is not in focused tabGroup, do nothing
  if (activeInfo === null || windowId !== activeInfo.tabGroupId) return;

  chrome.tabs.sendMessage(activeInfo.tabId, {
    event: 'extensionDeactivated'
  });

  activeInfo = null;
}

function focusedTabGroupChangedHandler() {
  // if tabio was not activated, do nothing
  if (activeInfo === null) return;

  chrome.tabs.sendMessage(activeInfo.tabId, {
    event: 'extensionDeactivated'
  });

  activeInfo = null;
}

function messageHandler({action, payload}) {
  switch (action) {
    case 'goToTab':
      chrome.tabs.update(payload.tabId, {active: true});
      chrome.windows.update(payload.tabGroupId, {focused: true});
      break;
    case 'closeTab':
      chrome.tabs.remove(payload.tabId);
      break;
  }
}
