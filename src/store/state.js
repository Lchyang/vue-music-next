import { PLAYMODE, FAVORITE_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/store'
const state = {
    sequenceList: [],
    playList: [],
    playMode: PLAYMODE.sequence,
    currentIndex: 0,
    playing: false,
    fullScreen: false,
    favoriteList: load(FAVORITE_KEY)
}
export default state
