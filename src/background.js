console.log('Hello from background.js');
console.log('chrome', chrome);

chrome.browserAction.onClicked.addListener(tab => {
  chrome.windows.getAll({populate: true}, tabGroups => {
    chrome.tabs.sendMessage(tab.id, {
      event: 'browserActionClicked',
      payload: tabGroups
    });
  });
});
