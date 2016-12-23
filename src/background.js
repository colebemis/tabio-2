console.log('Hello from background.js');
console.log('chrome', chrome);

let activeTabId = null;

chrome.browserAction.onClicked.addListener(tab => {
  activeTabId = tab.id;

  chrome.windows.getAll({populate: true}, tabGroups => {
    chrome.tabs.sendMessage(tab.id, {
      event: 'browserActionClicked',
      payload: tabGroups
    });
  });
});

chrome.tabs.onActivated.addListener(({tabId}) => {
  // if tabio was not activated, do nothing
  if (activeTabId === null) return;

  chrome.tabs.sendMessage(activeTabId, {
    event: 'tabDeactivated'
  });

  activeTabId = null;
});
