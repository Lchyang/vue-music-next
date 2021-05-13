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
        let list
        if (isFavorite(song)) {
            list = remove(FAVORITE_KEY, compare)
        } else {
            list = save(FAVORITE_KEY, song, compare)
        }
        store.commit('setFavoriteList', list)
    }

    function favoriteCls(song) {
        return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    }

    function isFavorite(song) {
        return favoriteList.value.findIndex((item) => {
            return item.id === song.id
        }) > -1
    }

    return {
        toggleFavorite,
        favoriteCls
    }
}
