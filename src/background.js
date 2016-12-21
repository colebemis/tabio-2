console.log('Hello from background.js');
console.log('chrome', chrome);

// chrome.browserAction.onClicked.addListener(tab => {
//   chrome.tabs.sendMessage(tab.id, {greeting: 'Hello from background.js'});
// });