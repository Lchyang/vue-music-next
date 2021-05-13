const mutations = {
    setPlayingState(state, playing) {
        state.playing = playing
    },
    setCurrentIndex(state, currentIndex) {
        state.currentIndex = currentIndex
    },
    setSequenceList(state, sequenceList) {
        state.sequenceList = sequenceList
    },
    setPlayList(state, playList) {
        state.playList = playList
    },
    setFullScreen(state, fullScreen) {
        state.fullScreen = fullScreen
    },
    setPlayMode(state, playMode) {
        state.playMode = playMode
    },
    setFavoriteList(state, list) {
        state.favoriteList = list
    }
}
export default mutations
