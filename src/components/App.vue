<template>
  <div id="tabio" v-if="isOpen">
    <ul v-for="tabGroup in tabGroups">
      <li v-for="tab in tabGroup.tabs">
        {{tab.title}}
      </li>
    </ul>
    <button type="button" @click="closeExtension()">Hide</button>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: 'app',
    computed: mapState([
      'isOpen', // map this.isOpen to this.$store.state.isOpen
      'tabGroups'
    ]),
    methods: mapMutations([
      'closeExtension' // map this.closeExtension() to this.$store.commit('closeExtension')
    ])
  }
</script>

<style lang="stylus" scoped>
  #tabio
    color blue
</style>
