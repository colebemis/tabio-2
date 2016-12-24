<template>
  <div id="tabio" v-if="isOpen">
    <ul v-for="tabGroup in tabGroups">
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
  import {mapState, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'app',
    computed: mapState([
      'isOpen', // map this.isOpen to this.$store.state.isOpen
      'tabGroups'
    ]),
    methods: {
      ...mapMutations([
        'closeExtension' // map this.closeExtension() to this.$store.commit('closeExtension')
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
