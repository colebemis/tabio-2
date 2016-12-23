import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App';

console.log('Hello from content.js');
console.log('chrome', chrome);

// create and insert root DOM node
const root = document.createElement('div');
root.id = 'tabio';
document.body.insertBefore(root, document.body.childNodes[0]);


// TODO: move to store.js
// create Vuex store
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isOpen: false,
    tabGroups: []
  },
  mutations: {
    openExtension(state, tabGroups) {
      state.tabGroups = tabGroups;
      state.isOpen = true;
    },
    closeExtension(state) {
      state.isOpen = false;
    }
  },
  actions: {
    goToTab(context, tabData) {
      chrome.runtime.sendMessage({
        action: 'goToTab',
        payload: tabData
      });
    }
  }
});

// create root Vue instance
new Vue({
  el: '#tabio',
  store,
  components: {App},
  template: '<app/>'
});

// TODO: move to event-handlers.js
function browserActionClickedHandler(store, payload) {
  if (store.state.isOpen) {
    store.commit('closeExtension');
  } else {
    store.commit('openExtension', payload);
  }
}

function tabDeactivatedHandler(store) {
  if (store.state.isOpen) {
    store.commit('closeExtension');
  }
}

chrome.runtime.onMessage.addListener(({event, payload}) => {
  switch (event) {
    // TODO: use constants for event types
    case 'browserActionClicked':
      browserActionClickedHandler(store, payload);
      break;
    case 'tabDeactivated':
      tabDeactivatedHandler(store);
      break;
  }
});
