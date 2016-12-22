<template>
  <div id="tabio" v-if="isVisible">Hello from App.vue</div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'app',
    computed: mapState([
      // map this.isVisible to store.state.isVisible
      'isVisible'
    ])
  }
</script>

<style lang="stylus" scoped>
  #tabio
    color blue
</style>
