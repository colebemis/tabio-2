<template>
  <div class="modal">
    <h1>Modal</h1>
    <input type="text" :value="filterText">
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'Modal',
  computed: {
    ...mapState([
      'filterText'
    ])
  }
}
</script>

<style lang="stylus" scoped>
</style>
