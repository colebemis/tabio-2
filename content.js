console.log('Hello from content.js');
console.log('chrome', chrome);

// chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {});

// create and insert root DOM node
const anchor = document.createElement('div');
anchor.id = 'tabio';
document.body.insertBefore(anchor, document.body.childNodes[0]);

let App = Vue.component('app', {
  template: `<div id="tabio" v-if="isVisible">Hello World</div>`,
  data() {
    return {
      isVisible: true
    };
  }
});

// create root instance
new Vue({
  el: '#tabio',
  render(createElement) {
    return createElement(App);
  }
});
