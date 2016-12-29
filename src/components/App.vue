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
    <input type="text" v-focus :value="filterText" @input="inputHandler">
    <p>{{filterText}}</p>

    <ul v-for="tabGroup in filteredTabGroups">
      <li
        v-for="tab in tabGroup.tabs"
        :class="{selected: tab.id === selectedTab.id}"
        @mouseenter="selectTab(tab)"
      >
        {{tab.title}}
        <button type="button" @click="goToTab({
          tabId: tab.id,
          tabGroupId: tab.windowId,
          isActive: tab.active,
          isFocused: tabGroup.focused
        })">Go</button>
        <button type="button" @click="closeTab({tabId: tab.id})">Close</button>
      </li>
    </ul>

    <button type="button" @click="closeExtension()">Hide</button>
  </div>
</template>

<script>
  import Modal from './Modal';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import * as types from '../store/mutation-types';

  export default {
    name: 'App',
    components: {
      Modal
    },
    directives: {
      focus: {
        // when the bound element is inserted into the DOM
        inserted(el) {
          // focus the element
          el.focus();
        },
        // after the containing component and its children have updated
        componentUpdated(el) {
          // focus the element
          el.focus();
        }
      }
    },
    computed: {
      ...mapState([
        'isOpen', // map this.isOpen to this.$store.state.isOpen
        'filterText',
        'selectedTab'
      ]),
      ...mapGetters([
        'filteredTabGroups'
      ])
    },
    methods: {
      ...mapMutations({
        closeExtension: types.CLOSE_EXTENSION,
        updateFilterText: types.UPDATE_FILTER_TEXT,
        selectTab: types.SELECT_TAB,
        selectNextTab: types.SELECT_NEXT_TAB,
        selectPrevTab: types.SELECT_PREV_TAB,
        selectActiveTab: types.SELECT_ACTIVE_TAB,
        selectFirstTab: types.SELECT_FIRST_TAB
      }),
      ...mapActions([
        'goToTab',
        'closeTab'
      ]),
      inputHandler(event) {
        this.updateFilterText(event.target.value);

        if (!event.target.value) {
          this.selectActiveTab(this.filteredTabGroups);
        } else {
          this.selectFirstTab(this.filteredTabGroups);
        }
      },
      getTabGroupById(tabGroupId, tabGroups) {
        return tabGroups.find(tabGroup => tabGroup.id === tabGroupId);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #tabio
    color blue

  .selected
    color white
    background blue
</style>
