<template>
  <div id="tabio" v-if="isVisible">Hello from App.vue</div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      isVisible() {
        return this.$store.state.isVisible;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #tabio
    color blue
</style>
