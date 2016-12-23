import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  isOpen: false,
  tabGroups: []
};

const mutations = {
  // TODO: use constants for mutation names
  openExtension(state, tabGroups) {
    state.tabGroups = tabGroups;
    state.isOpen = true;
  },
  closeExtension(state) {
    state.isOpen = false;
  }
};

const actions = {
  goToTab({commit}, {tabId, windowId, active, focused}) {
    if (active && focused) {
      commit('closeExtension');
    } else {
      chrome.runtime.sendMessage({
        action: 'goToTab',
        payload: {tabId, windowId}
      });
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
