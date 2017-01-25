<template>
  <div class="tab-groups" v-if="tabGroups.length">
    <tab-group v-for="tabGroup in tabGroups" :tab-group="tabGroup"></tab-group>
  </div>
</template>

<script>
  import TabGroup from './TabGroup';

  export default {
    name: 'TabGroups',
    props: {
      tabGroups: Array
    },
    components: {
      TabGroup
    }
  }
</script>

<style lang="stylus" scoped>
  @require '../styles/colors'

  .tab-groups
    flex 1 1 auto
    overflow auto
    user-select none

    &::-webkit-scrollbar
      display none
</style>
