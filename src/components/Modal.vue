<template>
  <div class="modal" @click.stop>
    <filter-box :filter-text="filterText" @input="inputHandler"></filter-box>
    <tab-groups :tab-groups="filteredTabGroups"></tab-groups>
  </div>
</template>

<script>
import FilterBox from './FilterBox';
import TabGroups from './TabGroups';
import {mapState, mapGetters, mapMutations} from 'vuex';
import * as types from '../store/mutation-types';

export default {
  name: 'Modal',
  components: {
    FilterBox,
    TabGroups
  },
  computed: {
    ...mapState([
      'filterText'
    ]),
    ...mapGetters([
      'filteredTabGroups'
    ])
  },
  methods: {
    ...mapMutations({
      updateFilterText: types.UPDATE_FILTER_TEXT,
      selectActiveTab: types.SELECT_ACTIVE_TAB,
      selectFirstTab: types.SELECT_FIRST_TAB
    }),
    inputHandler(event) {
      this.updateFilterText(event.target.value);

      if (!event.target.value) {
        this.selectActiveTab(this.filteredTabGroups);
      } else {
        this.selectFirstTab(this.filteredTabGroups);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @require '../styles/colors'

  .modal
    position static
    display flex
    flex-direction column
    align-items stretch
    width 100%
    max-width 560px
    max-height 480px
    margin 0
    padding 0
    background-color #fff
    box-shadow 0 0 0 1px color-border, 0 25px 60px 10px rgba(0, 0, 0, 0.26)
    border-radius 4px
    overflow hidden

</style>
