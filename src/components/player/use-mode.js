import { useStore } from 'vuex'
import { PLAYMODE } from '@/assets/js/constant'
import { computed } from 'vue'
export default function playMode() {
    const store = useStore()
    const playingMode = computed(() => {
        return store.state.playMode
    })
    const modeCls = computed(() => {
        const mode = playingMode.value
        return mode === PLAYMODE.sequence ? 'icon-sequence' : mode === PLAYMODE.random ? 'icon-random' : 'icon-loop'
    })

    function changeMode() {
        const mode = (playingMode.value + 1) % 3
        store.dispatch('changeMode', mode)
    }
    return {
        modeCls,
        changeMode,
        playingMode
    }
}
