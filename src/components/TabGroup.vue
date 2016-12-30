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
  @require '../styles/colors'

  .tab-group
    margin 0
    padding 8px
    position relative

    &:not(:last-of-type)
      border-bottom 1px solid color-border
</style>
