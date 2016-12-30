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
  @require '../styles/colors';

  .tab
    display flex
    flex-direction row
    align-items center
    height 40px
    padding 0 6px
    line-height @height
    border-radius 3px
    cursor pointer

  .tab-active
    .tab-title
      color color-primary

    .tab-url
      color rgba(color-primary, 0.7)

  .tab-selected
    color white
    background-color color-primary

    .tab-title
      color color-text-light-primary

    .tab-url
      color color-text-light-secondary

    .tab-close
      display block

  .tab-favicon
    width 16px
    height 16px
    flex 0 0 auto
    margin 0 6px
    line-height 0

  .tab-favicon-hidden
    visibility hidden

  .tab-title
    flex 0 0 auto
    max-width 50%
    padding 0 6px
    color color-text-dark-primary
    white-space nowrap
    overflow hidden
    text-overflow ellipsis

  .tab-url
    flex 1 1 auto
    padding 0 6px
    color color-text-dark-secondary
    white-space nowrap
    overflow hidden
    text-overflow ellipsis

  .tab-close
    display none
    flex 0 0 auto
    padding 6px
    line-height 0
    border-radius 2px

    &:hover
      background-color color-border
      
  .tab-close-icon
    width 16px
    height 16px
    fill none
    stroke #fff
    stroke-width 1
    stroke-linecap round
    stroke-linecap round
</style>
