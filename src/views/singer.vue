<template>
  <div class="singer" v-loading="!singerList.length">
    <index-list :data="singerList" @select="onSelect"></index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>
<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/base/index-list/index-list'
import goodStore from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
export default {
  components: { IndexList },
  data() {
    return {
      singerList: [],
      selectedSinger: null
    }
  },
  methods: {
    onSelect(singer) {
      this.catche(singer)
      this.selectedSinger = singer
      this.$router.push({ path: `/singer/${singer.mid}` })
    },
    catche(singer) {
      goodStore.session.set(SINGER_KEY, singer)
    }
  },
  async created() {
    const result = await getSingerList()
    this.singerList = result.singers
  }
}
</script>
<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
