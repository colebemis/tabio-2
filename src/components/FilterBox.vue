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
  @require '../styles/colors'

  .filter-box
    flex 0 0 auto
    width 100%
    height 64px
    margin 0
    padding 0 20px
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif
    font-size 28px
    font-weight 300
    line-height @height
    color color-text-dark-primary
    border none
    border-bottom 1px solid color-border
    background transparent
    outline none
    box-shadow none
    box-sizing border-box
</style>
