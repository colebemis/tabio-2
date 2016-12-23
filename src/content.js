import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App';

console.log('Hello from content.js');
console.log('chrome', chrome);

// create and insert root DOM node
const root = document.createElement('div');
root.id = 'tabio';
document.body.insertBefore(root, document.body.childNodes[0]);

// create Vuex store
Vue.use(Vuex);

const store = new Vuex.Store ({
  state: {
    isVisible: false,
    tabGroups: []
  },
  mutations: {
    showExtension(state, tabGroups) {
      state.tabGroups = tabGroups;
      state.isVisible = true;
    },
    hideExtension(state) {
      state.isVisible = false;
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

chrome.runtime.onMessage.addListener(({event, payload}) => {
  switch (event) {
    case 'browserActionClicked':
      if (store.state.isVisible) {
        store.commit('hideExtension');
      } else {
        store.commit('showExtension', payload);
      }
      break;
  }
});
