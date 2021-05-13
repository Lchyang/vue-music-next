import { PLAYMODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/utils'
const actions = {
    selectPlay({ commit }, { list, index }) {
        commit('setPlayingState', true)
        commit('setCurrentIndex', index)
        commit('setSequenceList', list)
        commit('setPlayList', list)
        commit('setFullScreen', true)
        commit('setPlayMode', PLAYMODE.sequence)
    },

    selectRandom({ commit }, list) {
        commit('setPlayingState', true)
        commit('setCurrentIndex', 0)
        commit('setSequenceList', list)
        commit('setPlayList', shuffle(list))
        commit('setFullScreen', true)
        commit('setPlayMode', PLAYMODE.random)
    },

    changeMode({ commit, state, getters }, mode) {
        if (mode === PLAYMODE.random) {
            const list = shuffle(state.playList)
            const songId = getters.currentSong(state).id
            const index = list.findIndex((item) => {
                return item.id === songId
            })
            commit('setPlayList', list)
            commit('setPlayMode', PLAYMODE.random)
            commit('setCurrentIndex', index)
        }
        commit('setPlayMode', mode)
    }

}
export default actions
