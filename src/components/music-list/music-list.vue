<template>
  <div class="music-list">
    <div
      class="back"
      @click="goBack"
    >
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div
      class="bg-image"
      :style="bgImageStyle"
      ref="bgImage"
    >
      <div
        class="play-btn-wrapper"
        :style="playBtnStyle"
      >
        <div
          v-show="songs.length > 0"
          class="play-btn"
          @click="random"
        >
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div
        class="filter"
      ></div>
    </div>
    <scroll
      class="list"
      v-loading="loading"
      :style="scrollStyle"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list
          :songs="songs"
          @select="selectItem"
          :rank="rank"
        ></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from '@/components/base/song-list/song-list'
import Scroll from '@/components/base/scroll/scroll'
const HEADERHEIGHT = 40
export default {
  components: {
    SongList,
    Scroll
  },
  data() {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxScroll: 0
    }
  },
  props: {
    rank: {
      type: Boolean,
      default: false
    },
    songs: {
      type: Object
    },
    title: String,
    pic: String,
    loading: Boolean
  },
  computed: {
    bgImageStyle() {
      const scrollY = this.scrollY
      let zIndex = 0
      let paddingTop = '70%'
      let height = 0
      let scale = 1
      let translateZ = 0

       if (scrollY > this.maxScroll) {
          paddingTop = 0
          height = `${HEADERHEIGHT}px`
          translateZ = 1
          zIndex = 10
        }
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight)
      }
      return {
        transform: `scale(${scale})translateZ(${translateZ})`,
        height,
        zIndex,
        paddingTop,
        backgroundImage: `url(${this.pic})`
      }
    },
    playBtnStyle() {
      let display = ''
      if (this.scrollY > this.maxScroll) {
        display = 'none'
      }
      return {
        display
      }
    },
    scrollStyle() {
      const top = this.imageHeight + 'px'
      return {
        top
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    selectItem() {
    },
    onScroll(posY) {
      this.scrollY = -posY
    }
  },
  created() {
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.maxScroll = this.imageHeight - HEADERHEIGHT
  }
}
</script>

<style lang="scss" scoped>
  .music-list {
    position: relative;
    height: 100%;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 20;
      transform: translateZ(2px);
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      z-index: 20;
      transform: translateZ(2px);
      @include no-wrap();
      text-align: center;
      line-height: 40px;
      font-size: $font-size-large;
      color: $color-text;
    }
    .bg-image {
      position: relative;
      width: 100%;
      transform-origin: top;
      background-size: cover;
      .play-btn-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
        .play-btn {
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid $color-theme;
          color: $color-theme;
          border-radius: 100px;
          font-size: 0;
        }
        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
      }
    }
    .list {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 0;
      .song-list-wrapper {
        padding: 20px 30px;
        background: $color-background;
      }
    }
  }
</style>
