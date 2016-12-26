<template>
  <div id="tabio" v-if="isOpen">
    <input type="text" :value="filterText" @input="updateFilterText($event.target.value)">
    <p>{{filterText}}<p>

    <ul v-for="tabGroup in filteredTabGroups">
      <li v-for="tab in tabGroup.tabs">
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
    computed: {
      ...mapState([
        'isOpen', // map this.isOpen to this.$store.state.isOpen
        'filterText',
        'tabGroups'
      ]),
      ...mapGetters([
        'filteredTabGroups'
      ])
    },
    methods: {
      ...mapMutations([
        'closeExtension', // map this.closeExtension() to this.$store.commit('closeExtension')
        'updateFilterText'
      ]),
      ...mapActions([
        'goToTab',
        'closeTab'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  #tabio
    color blue
</style>
