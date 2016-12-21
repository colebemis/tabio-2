import Vue from 'vue';
import App from './App';

console.log('Hello from content.js');
console.log('chrome', chrome);

// chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {});

// create and insert root DOM node
const anchor = document.createElement('div');
anchor.id = 'tabio';
document.body.insertBefore(anchor, document.body.childNodes[0]);

// create root instance
new Vue({
  el: '#tabio',
  template: '<app />',
  components: {App}
});
