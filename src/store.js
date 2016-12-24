import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  isOpen: false,
  filterText: '',
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
    state.filterText = ''
  },
  updateTabGroups(state, tabGroups) {
    state.tabGroups = tabGroups;
  },
  updateFilterText(state, filterText) {
    state.filterText = filterText;
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
  },
  closeTab({commit}, tabId) {
    chrome.runtime.sendMessage({
      action: 'closeTab',
      payload: {tabId}
    });
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
