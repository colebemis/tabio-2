<template>
  <div
    id="tabio"
    v-if="isOpen"
    @keydown.up.stop.prevent="selectPrevTab(filteredTabGroups)"
    @keydown.down.stop.prevent="selectNextTab(filteredTabGroups)"
    @keydown.enter.stop.prevent="goToTab({
      tabId: selectedTab.id,
      tabGroupId: selectedTab.windowId,
      isActive: selectedTab.active,
      isFocused: getTabGroupById(selectedTab.windowId, filteredTabGroups).focused
    })"
    @keydown.meta.delete.stop.prevent="closeTab({tabId: selectedTab.id})"
    @keydown.esc.stop.prevent="closeExtension()"
    @click="closeExtension()"
  >
    <modal></modal>
  </div>
</template>

<script>
  import Modal from './Modal';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  import * as types from '../store/mutation-types';

  export default {
    name: 'App',
    components: {
      Modal
    },
    computed: {
      ...mapState([
        'isOpen',
        'selectedTab'
      ]),
      ...mapGetters([
        'filteredTabGroups'
      ])
    },
    methods: {
      ...mapMutations({
        closeExtension: types.CLOSE_EXTENSION,
        selectNextTab: types.SELECT_NEXT_TAB,
        selectPrevTab: types.SELECT_PREV_TAB,
      }),
      ...mapActions([
        'goToTab',
        'closeTab'
      ]),
      getTabGroupById(tabGroupId, tabGroups) {
        return tabGroups.find(tabGroup => tabGroup.id === tabGroupId);
      },
      scrollToSelection() {
        this.$nextTick(function () {
          const padding = 8;

          const container = this.$el.querySelector('.tab-groups');
          const containerTop = container.scrollTop;
          const containerBottom = container.scrollTop + container.offsetHeight;

          const selectedTab = this.$el.querySelector('.tab-selected');
          const selectedTabTop = (selectedTab.offsetParent.offsetTop - container.offsetTop) + selectedTab.offsetTop;
          const selectedTabBottom = selectedTabTop + selectedTab.offsetHeight;

          if (selectedTabTop < (containerTop + padding)) {
            container.scrollTop += selectedTabTop - (containerTop + padding);
          }

          if (selectedTabBottom > (containerBottom - padding)) {
            container.scrollTop += selectedTabBottom - (containerBottom - padding);
          }

        });
      }
    },
    watch: {
      selectedTab: function () {
        this.scrollToSelection();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #tabio
    z-index 999999
    display flex
    flex-direction column
    align-items center
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    padding 12vh 16px 8vh
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif
    font-size 14px
    font-weight 400
    font-style normal
    letter-spacing 0
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale

</style>
