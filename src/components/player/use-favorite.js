import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from '@/assets/js/store'
import { FAVORITE_KEY } from '@/assets/js/constant'

export default function useFavorite() {
    const store = useStore()
    const favoriteList = computed(() => {
        return store.state.favoriteList
    })

    function toggleFavorite(song) {
        const compare = (item) => {
            return item.id === song.id
        }
        const index = favoriteList.value.findIndex((item) => {
            return item.id === song.id
        })
        if (index > -1) {
            const list = remove(FAVORITE_KEY, song, compare)
            store.commit('setFavoriteList', list)
        } else {
            const list = save(FAVORITE_KEY, song)
            store.commit('setFavoriteList', list)
        }
    }
    function favoriteCls(song) {
        const index = favoriteList.value.findIndex((item) => {
            return item.id === song.id
        })
        return index > -1 ? 'icon-favorite' : 'icon-not-favorite'
    }
    return {
        toggleFavorite,
        favoriteCls
    }
}
