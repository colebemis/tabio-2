import Vue from 'vue';
import App from './components/App';

console.log('Hello from content.js');
console.log('chrome', chrome);

// chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {});

// create and insert root DOM node
const root = document.createElement('div');
root.id = 'tabio';
document.body.insertBefore(root, document.body.childNodes[0]);

// create root Vue instance
new Vue({
  el: '#tabio',
  template: '<app/>',
  components: {App}
});
