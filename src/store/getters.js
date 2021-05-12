const getters = {
    currentSong(state) {
        return state.playList[state.currentIndex]
    }
}

export default getters
