<template>
  <div class="modal">
    <input type="text" v-focus :value="filterText" @input="inputHandler">
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import * as types from '../store/mutation-types';

export default {
  name: 'Modal',
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
