<template>
  <div class="progress-bar" @click="onClick">
    <div class="bar-inner">
      <div class="progress" ref="progress" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
const buttonWidth = 16
export default {
  data() {
    return {
      offestX: 0
    }
  },
  props: {
    progress: {
      type: Number
    }
  },
  computed: {
    btnStyle() {
      return `transform: translate(${this.offestX}px, 0)`
    },
    progressStyle() {
      return `width: ${this.offestX}px`
    }
  },
  watch: {
    progress(newProgress) {
      const offestX = newProgress * (this.$el.clientWidth - buttonWidth)
      this.offestX = offestX
    }
  },
  methods: {
    onClick(e) {
      const barRect = this.$el.getBoundingClientRect()
      const pagex = e.pageX
      const playedBar = pagex - barRect.left - buttonWidth
      const progress = playedBar / (this.$el.clientWidth - buttonWidth)
      this.$emit('progress-changed', progress)
    },

    onTouchStart(e) {
      this.touch.start = e.touches[0].pageX
      this.touch.beginWidth = this.offestX
    },

    onTouchMove(e) {
        const barWidth = this.$el.clientWidth - buttonWidth
        const scrollX = e.touches[0].pageX - this.touch.start
        const point = Math.min(Math.max(this.touch.beginWidth + scrollX, 0), barWidth)
        const progress = point / barWidth
        this.$emit('progress-changing', progress)
    },

    onTouchEnd(e) {
        const barWidth = this.$el.clientWidth - buttonWidth
        const progress = this.offestX / barWidth
        this.$emit('progress-changed', progress)
    }
  },
  created() {
    this.touch = {}
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
