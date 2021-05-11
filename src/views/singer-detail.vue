<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading"
    ></music-list>
  </div>
</template>
<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list'
export default {
  components: { MusicList },
  data() {
    return {
      loading: true,
      songs: []
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    title() {
      return this.data.name
    },
    pic() {
      return this.data.pic
    }
  },
  async created() {
    const result = await getSingerDetail(this.data)
    this.songs = await processSongs(result.songs)
    this.loading = false
  }
}
</script>
<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
