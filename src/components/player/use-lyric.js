import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from '@/assets/js/lyric-parser'

export default function useLyric({ currentTime }) {
    const store = useStore()
    const currentLyric = ref(null)
    const playingLyric = ref('')

    const currentSong = computed(() => {
        return store.getters.currentSong
    })

    const playing = computed(() => store.state.playing)

    watch(currentSong, async (newSong) => {
        const lyricValue = currentLyric.value
        if (lyricValue) {
            lyricValue.stop()
        }
        const lyric = await getLyric(newSong)
        currentLyric.value = new Lyric(lyric, handler)
        currentLyric.value.play()
    })

    watch(playing, () => {
        if (currentLyric.value) {
            currentLyric.value.togglePlay()
        }
    })

    function playLyric() {
        if (currentLyric.value) {
            currentLyric.value.seek(currentTime.value * 1000)
        }
    }

    function handler({ lineNum, txt }) {
        playingLyric.value = txt
    }

    return {
        playLyric,
        playingLyric
    }
}
