<template>
  <ul class="tab-group">
    <tab v-for="tab in tabGroup.tabs" :tab="tab" :is-focused="tabGroup.focused"></tab>
  </ul>
</template>

<script>
  import Tab from './Tab';

  export default {
    name: 'TabGroup',
    props: {
      tabGroup: Object
    },
    components: {
      Tab
    }
  }
</script>

<style lang="stylus" scoped>
</style>
