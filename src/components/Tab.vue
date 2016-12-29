<template>
  <li
    class="tab"
    :class="{
      'tab-active': tab.active,
      'tab-selected': tab.id === selectedTab.id
    }"
    @mouseenter="selectTab(tab)"
    @click="goToTab({
      tabId: tab.id,
      tabGroupId: tab.windowId,
      isActive: tab.active,
      isFocused
    })"
  >
    <img
      class="tab-favicon"
      :class="{'tab-favicon-hidden': !hasFavicon}"
      :src="tab.favIconUrl"
      alt="Favicon"
    >
    <span class="tab-title">{{tab.title}}</span>
    <span class="tab-url">{{tabUrl}}</span>
    <div class="tab-close" @click.stop="closeTab({tabId: tab.id})">
      <svg class="tab-close-icon" viewBox="0 0 16 16">
        <path d="M 3 3, l 10 10 M 13 3 l -10 10">
      </svg>
    </div>
  </li>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  import * as types from '../store/mutation-types';

  export default {
    name: 'Tab',
    props: {
      tab: Object,
      isFocused: Boolean
    },
    computed: {
      ...mapState([
        'selectedTab'
      ]),
      hasFavicon() {
        return this.tab.favIconUrl && /http/.test(this.tab.favIconUrl);
      },
      tabUrl() {
        return this.tab.url.replace(/.*\/\//, '');
      }
    },
    methods: {
      ...mapMutations({
        selectTab: types.SELECT_TAB
      }),
      ...mapActions([
        'goToTab',
        'closeTab'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  .tab
    cursor pointer

  .tab-active
    background-color yellow

  .tab-selected
    color white
    background-color blue

  .tab-favicon
    width 16px
    height 16px

  .tab-favicon-hidden
    visibility hidden

  .tab-close-icon
    width 16px
    height 16px
    fill none
    stroke #000
    stroke-width 1
    stroke-linecap round
    stroke-linecap round
    background-color #fff
</style>
