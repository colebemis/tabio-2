<template>
  <div
    id="tabio"
    v-if="isOpen"
    @keydown.down.stop.prevent="selectNextTab(filteredTabGroups)"
    @keydown.up.stop.prevent="selectPrevTab(filteredTabGroups)"
  >
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
          windowId: tab.windowId,
          active: tab.active,
          focused: tabGroup.focused
        })">Go</button>
        <button type="button" @click="closeTab(tab.id)">Close</button>
      </li>
    </ul>

    <button type="button" @click="closeExtension()">Hide</button>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'app',
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
      ...mapMutations([
        'closeExtension', // map this.closeExtension() to this.$store.commit('closeExtension')
        'updateFilterText',
        'selectTab',
        'selectNextTab',
        'selectPrevTab',
        'selectActiveTab',
        'selectFirstTab'
      ]),
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
