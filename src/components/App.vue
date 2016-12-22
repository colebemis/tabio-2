<template>
  <div id="tabio" v-if="isVisible">
    Hello from App.vue
    {{JSON.stringify(tabGroups)}}
    <button type="button" @click="hideExtension()">Hide</button>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: 'app',
    computed: mapState([
      // map this.isVisible to this.$store.state.isVisible
      'isVisible',
      'tabGroups'
    ]),
    methods: mapMutations([
      // map this.hideExtension() to this.$store.commit('hideExtension')
      'hideExtension'
    ])
  }
</script>

<style lang="stylus" scoped>
  #tabio
    color blue
</style>
