import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions'
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  isOpen: false,
  filterText: '',
  tabGroups: [],
  selectedTab: {}
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
