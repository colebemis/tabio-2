import * as types from './mutation-types';

export const goToTab = ({commit}, {tabId, tabGroupId, active, focused}) => {
  if (active && focused) {
    commit(types.CLOSE_EXTENSION);
  } else {
    chrome.runtime.sendMessage({
      action: 'goToTab',
      payload: {tabId, tabGroupId}
    });
  }
};

export const closeTab = ({commit}, {tabId}) => {
  chrome.runtime.sendMessage({
    action: 'closeTab',
    payload: {tabId}
  });
};
