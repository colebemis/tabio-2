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
    }).filter(tabGroup => tabGroup.tabs.length > 0);
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
  },
  selectNextTab(state, filteredTabGroups) {
    const selectedTabGroupIndex = filteredTabGroups.findIndex(tabGroup => {
      return tabGroup.id === state.selectedTab.windowId;
    });

    const selectedTabIndex = filteredTabGroups[selectedTabGroupIndex].tabs.findIndex(tab => {
      return tab.id === state.selectedTab.id;
    });

    // if selected tab is not last tab in selected tabGroup
    if (selectedTabIndex < filteredTabGroups[selectedTabGroupIndex].tabs.length - 1) {
      // select next tab
      state.selectedTab = filteredTabGroups[selectedTabGroupIndex].tabs[selectedTabIndex + 1];
    } else {
      // if selected tab is not in last tabGroup
      if (selectedTabGroupIndex < filteredTabGroups.length - 1) {
        // select first tab in next tabGroup
        state.selectedTab = filteredTabGroups[selectedTabGroupIndex + 1].tabs[0];
      } else {
        // select first tab in first tabGroup
        state.selectedTab = filteredTabGroups[0].tabs[0];
      }
    }
  },
  selectPrevTab(state, filteredTabGroups) {
    const selectedTabGroupIndex = filteredTabGroups.findIndex(tabGroup => {
      return tabGroup.id === state.selectedTab.windowId;
    });

    const selectedTabIndex = filteredTabGroups[selectedTabGroupIndex].tabs.findIndex(tab => {
      return tab.id === state.selectedTab.id;
    });

    if (selectedTabIndex > 0) {
      // if selected tab is not first tab in selected tabGroup
      // select previous tab
      state.selectedTab = filteredTabGroups[selectedTabGroupIndex].tabs[selectedTabIndex - 1];
    } else if (selectedTabGroupIndex > 0) {
      // if selected tabGroup is not first tabGroup
      // select last tab in previous tabGroup
      const prevTabGroupIndex = selectedTabGroupIndex - 1;
      const lastTabIndex = filteredTabGroups[prevTabGroupIndex].tabs.length - 1;
      state.selectedTab = filteredTabGroups[prevTabGroupIndex].tabs[lastTabIndex];
    } else {
      // select last tab in last tabGroup
      const lastTabGroupIndex = filteredTabGroups.length - 1;
      const lastTabIndex = filteredTabGroups[lastTabGroupIndex].tabs.length - 1;
      state.selectedTab = filteredTabGroups[lastTabGroupIndex].tabs[lastTabIndex];
    }
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
