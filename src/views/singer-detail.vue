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
import goodStore from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
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
      type: Object
    }
  },
  computed: {
    computedData() {
      let result
      const data = this.data
      if (data) {
        result = data
      } else {
        const cache = goodStore.session.get(SINGER_KEY)
        if (cache && (cache.mid || cache.id + '') === this.$route.params.id) {
          result = cache
        }
      }
      return result
    },
    title() {
      const data = this.computedData
      return data && (data.name || data.title)
    },
    pic() {
      const data = this.computedData
      return data && data.pic
    }
  },
  async created() {
    const data = this.computedData
    if (!data) {
      const path = this.$route.matched[0].path
      this.$router.push({ path })
      return
    }
    const result = await getSingerDetail(data)
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
