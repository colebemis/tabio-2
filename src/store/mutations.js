import * as types from './mutation-types';

export default {
  [types.OPEN_EXTENSION](state, tabGroups) {
    state.tabGroups = tabGroups;
    state.isOpen = true;
  },

  [types.CLOSE_EXTENSION](state) {
    state.isOpen = false;
    state.filterText = ''
  },

  [types.UPDATE_TAB_GROUPS](state, tabGroups) {
    state.tabGroups = tabGroups;
  },

  [types.UPDATE_FILTER_TEXT](state, filterText) {
    state.filterText = filterText;
  },

  [types.SELECT_TAB](state, tab) {
    state.selectedTab = tab;
  },

  [types.SELECT_NEXT_TAB](state, tabGroups) {
    if (!tabGroups.length) return;

    const selectedTabGroupIndex = tabGroups.findIndex(tabGroup => {
      return tabGroup.id === state.selectedTab.windowId;
    });

    const selectedTabIndex = tabGroups[selectedTabGroupIndex].tabs.findIndex(tab => {
      return tab.id === state.selectedTab.id;
    });

    if (selectedTabIndex < tabGroups[selectedTabGroupIndex].tabs.length - 1) {
      // if selected tab is not last tab in selected tabGroup
      // select next tab
      state.selectedTab = tabGroups[selectedTabGroupIndex].tabs[selectedTabIndex + 1];
    } else if (selectedTabGroupIndex < tabGroups.length - 1) {
      // if selected tab is not in last tabGroup
      // select first tab in next tabGroup
      state.selectedTab = tabGroups[selectedTabGroupIndex + 1].tabs[0];
    } else {
      // select first tab in first tabGroup
      state.selectedTab = tabGroups[0].tabs[0];
    }
  },

  [types.SELECT_PREV_TAB](state, tabGroups) {
    if (!tabGroups.length) return;

    const selectedTabGroupIndex = tabGroups.findIndex(tabGroup => {
      return tabGroup.id === state.selectedTab.windowId;
    });

    const selectedTabIndex = tabGroups[selectedTabGroupIndex].tabs.findIndex(tab => {
      return tab.id === state.selectedTab.id;
    });

    if (selectedTabIndex > 0) {
      // if selected tab is not first tab in selected tabGroup
      // select previous tab
      state.selectedTab = tabGroups[selectedTabGroupIndex].tabs[selectedTabIndex - 1];
    } else if (selectedTabGroupIndex > 0) {
      // if selected tabGroup is not first tabGroup
      // select last tab in previous tabGroup
      const prevTabGroupIndex = selectedTabGroupIndex - 1;
      const lastTabIndex = tabGroups[prevTabGroupIndex].tabs.length - 1;
      state.selectedTab = tabGroups[prevTabGroupIndex].tabs[lastTabIndex];
    } else {
      // select last tab in last tabGroup
      const lastTabGroupIndex = tabGroups.length - 1;
      const lastTabIndex = tabGroups[lastTabGroupIndex].tabs.length - 1;
      state.selectedTab = tabGroups[lastTabGroupIndex].tabs[lastTabIndex];
    }
  },

  [types.SELECT_ACTIVE_TAB](state, tabGroups) {
    const focusedTabGroupIndex = tabGroups.findIndex(tabGroup => tabGroup.focused);
    const activeTabIndex = tabGroups[focusedTabGroupIndex].tabs.findIndex(tab => tab.active);
    state.selectedTab = tabGroups[focusedTabGroupIndex].tabs[activeTabIndex];
  },

  [types.SELECT_FIRST_TAB](state, tabGroups) {
    if (!tabGroups.length) return;

    state.selectedTab = tabGroups[0].tabs[0];
  }
};
