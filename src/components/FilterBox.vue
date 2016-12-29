<template>
  <input
    class="filter-box"
    type="text"
    v-focus
    :value="filterText"
    @input="$emit('input', $event)"
  >
</template>

<script>
export default {
  name: 'FilterBox',
  props: {
    filterText: String
  },
  directives: {
    focus: {
      // when the bound element is inserted into the DOM
      inserted(el) {
        // focus the element
        el.focus();
      },
      // after the containing component and its children have updated
      componentUpdated(el) {
        // focus the element
        el.focus();
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
