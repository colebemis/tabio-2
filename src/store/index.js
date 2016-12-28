import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  isOpen: false,
  filterText: '',
  tabGroups: [],
  selectedTab: {}
};

const actions = {
  goToTab({commit}, {tabId, tabGroupId, active, focused}) {
    if (active && focused) {
      commit(types.CLOSE_EXTENSION);
    } else {
      chrome.runtime.sendMessage({
        action: 'goToTab',
        payload: {tabId, tabGroupId}
      });
    }
  },
  closeTab({commit}, {tabId}) {
    chrome.runtime.sendMessage({
      action: 'closeTab',
      payload: {tabId}
    });
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
