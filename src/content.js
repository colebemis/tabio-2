import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import App from './components/App';

console.log('Hello from content.js');
console.log('chrome', chrome);

// create and insert root DOM node
const root = document.createElement('div');
root.id = 'tabio';
document.body.insertBefore(root, document.body.childNodes[0]);

// create root Vue instance
new Vue({
  el: '#tabio',
  store,
  components: {App},
  template: '<app/>'
});

chrome.runtime.onMessage.addListener(({event, payload}) => {
  switch (event) {
    // TODO: use constants for event types
    case 'browserActionClicked':
      browserActionClickedHandler(store, payload.tabGroups);
      break;
    case 'tabDeactivated':
      tabDeactivatedHandler(store);
      break;
    case 'tabRemoved':
      tabRemovedHandler(store, payload);
      break;
  }
});

// TODO: move to event-handlers.js
function browserActionClickedHandler(store, tabGroups) {
  if (store.state.isOpen) {
    store.commit('closeExtension');
  } else {
    store.commit('openExtension', tabGroups);
    store.commit('selectActiveTab', tabGroups);
  }
}

function extensionDeactivatedHandler(store) {
  if (store.state.isOpen) {
    store.commit('closeExtension');
  }
}

function tabRemovedHandler(store, {tabId, tabGroupId, tabGroups}) {
  if (store.state.isOpen) {
    const tabGroupIndex = store.getters.filteredTabGroups.findIndex(tabGroup => tabGroup.id === tabGroupId);
    const tabIndex = store.getters.filteredTabGroups[tabGroupIndex].tabs.findIndex(tab => tab.id === tabId);

    const isNotLastTab = tabIndex < store.getters.filteredTabGroups[tabGroupIndex].tabs.length - 1;
    const isNotLastTabGroup = tabGroupIndex < store.getters.filteredTabGroups.length - 1;
    const isNotFirstTab = tabIndex > 0;
    const isNotFirstTabGroup = tabGroupIndex > 0;

    if (isNotLastTab || isNotLastTabGroup) {
      store.commit('selectNextTab', store.getters.filteredTabGroups);
    } else if (isNotFirstTab || isNotFirstTabGroup) {
      store.commit('selectPrevTab', store.getters.filteredTabGroups);
    }

    store.commit('updateTabGroups', tabGroups);
  }
}
