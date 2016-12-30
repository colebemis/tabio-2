<template>
  <div class="tab-groups">
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
</style>
