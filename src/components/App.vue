<template>
  <div id="tabio" v-if="isVisible">
    <ul v-for="tabGroup in tabGroups">
      <li v-for="tab in tabGroup.tabs">
        {{tab.title}}
      </li>
    </ul>
    <button type="button" @click="hideExtension()">Hide</button>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: 'app',
    computed: mapState([
      'isVisible', // map this.isVisible to this.$store.state.isVisible
      'tabGroups'
    ]),
    methods: mapMutations([
      'hideExtension' // map this.hideExtension() to this.$store.commit('hideExtension')
    ])
  }
</script>

<style lang="stylus" scoped>
  #tabio
    color blue
</style>
