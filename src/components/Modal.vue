<template>
  <div class="modal">
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
</style>
