import { ref } from 'vue'

export default function useMiddleTouch() {
    const currentShow = ref('cd')
    const touch = {}
    const middleLStyle = ref(null)
    const middleRStyle = ref(null)
    let showView = 'cd'
    let opacity
    let translateX

    function onMiddleTouchStart(e) {
        touch.startX = e.touches[0].pageX
        touch.startY = e.touches[0].pageY
    }

    function onMiddleTouchMove(e) {
        const deltaX = e.touches[0].pageX - touch.startX
        const deltaY = e.touches[0].pageY - touch.startY
        const absdeltaY = Math.abs(deltaY)
        const absdeltaX = Math.abs(deltaX)
        if (absdeltaY > absdeltaX) { return }

        const innerWidth = window.innerWidth
        const persent = deltaX / innerWidth
        const opacity = currentShow.value === 'cd' ? 1 + persent : persent

        if (currentShow.value === 'cd' && deltaX < 0) {
            translateX = deltaX
            if (persent < -0.2) {
                showView = 'lyric'
            }
        } else if (deltaX > 0 && currentShow.value === 'lyric') {
            translateX = deltaX - innerWidth
            if (persent > 0.2 && persent < 1) {
                showView = 'cd'
            }
        }

        middleLStyle.value = {
            opacity: opacity
        }
        middleRStyle.value = {
            transform: `translate(${translateX}px, 0)`
        }
    }

    function onMiddleTouchEnd(e) {
        if (showView === 'cd') {
            translateX = 0
            opacity = 1
            currentShow.value = 'cd'
        } else {
            translateX = '100%'
            opacity = 0
            currentShow.value = 'lyric'
        }
        const duration = 300
        middleRStyle.value = {
            transform: `translate(-${translateX}, 0)`,
            transitionDuration: `${duration}ms`
        }
        middleLStyle.value = {
            opacity: opacity,
            transitionDuration: `${duration}ms`
        }
    }

    return {
        onMiddleTouchEnd,
        onMiddleTouchStart,
        onMiddleTouchMove,
        currentShow,
        middleLStyle,
        middleRStyle
    }
}
