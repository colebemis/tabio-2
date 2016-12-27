import Vue from 'vue';
import Vuex from 'vuex';
import fuseFilter from './utilities/fuse-filter';

Vue.use(Vuex);

const state = {
  isOpen: false,
  filterText: '',
  tabGroups: [],
  selectedTab: {}
};

const getters = {
  orderedTabGroups({tabGroups}) {
    // make copy of tabGroups array
    const orderedTabGroups = tabGroups.slice();
    // find index of focused tabGroup
    const focusedIndex = tabGroups.findIndex(tabGroup => tabGroup.focused);
    // remove focused tabGroup from orderedTabGroups and save
    const focusedTabGroup = orderedTabGroups.splice(focusedIndex, 1)[0];
    // add focused tabGroup to front of orderedTabGroups
    orderedTabGroups.unshift(focusedTabGroup);

    return orderedTabGroups;
  },
  filteredTabGroups({filterText}, {orderedTabGroups}) {
    return orderedTabGroups.map(tabGroup => {
      const filteredTabs = {
        tabs: fuseFilter({
          list: tabGroup.tabs,
          filterText,
          keys: ['title', 'url']
        })
      };

      return Object.assign({}, tabGroup, filteredTabs);
    });
  }
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
  },
  selectTab(state, tab) {
    state.selectedTab = tab;
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
  getters,
  mutations,
  actions
});
