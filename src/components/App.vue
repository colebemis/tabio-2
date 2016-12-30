<template>
  <div
    id="tabio"
    v-if="isOpen"
    @keydown.down.stop.prevent="selectNextTab(filteredTabGroups)"
    @keydown.up.stop.prevent="selectPrevTab(filteredTabGroups)"
    @keydown.enter.stop.prevent="goToTab({
      tabId: selectedTab.id,
      tabGroupId: selectedTab.windowId,
      isActive: selectedTab.active,
      isFocused: getTabGroupById(selectedTab.windowId, filteredTabGroups).focused
    })"
    @keydown.meta.delete.stop.prevent="closeTab({tabId: selectedTab.id})"
    @keydown.esc.stop.prevent="closeExtension()"
  >
    <modal></modal>

    <tab-groups :tab-groups="filteredTabGroups"></tab-groups>

    <button type="button" @click="closeExtension()">Hide</button>
  </div>
</template>

<script>
  import Modal from './Modal';
  import TabGroups from './TabGroups';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import * as types from '../store/mutation-types';

  export default {
    name: 'App',
    components: {
      Modal,
      TabGroups
    },
    computed: {
      ...mapState([
        'isOpen', // map this.isOpen to this.$store.state.isOpen
        'selectedTab'
      ]),
      ...mapGetters([
        'filteredTabGroups'
      ])
    },
    methods: {
      ...mapMutations({
        closeExtension: types.CLOSE_EXTENSION,
        selectNextTab: types.SELECT_NEXT_TAB,
        selectPrevTab: types.SELECT_PREV_TAB,
      }),
      ...mapActions([
        'goToTab',
        'closeTab'
      ]),
      getTabGroupById(tabGroupId, tabGroups) {
        return tabGroups.find(tabGroup => tabGroup.id === tabGroupId);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #tabio
    color blue
</style>
