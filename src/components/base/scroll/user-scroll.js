import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

import { ref, onMounted, onUnmounted } from 'vue'

BScroll.use(ObserveDOM)

export default function userScroll(wrapperRef, options, { emit }) {
    const scroll = ref(null)

    function initBScroll() {
        scroll.value = new BScroll(wrapperRef.value, {
            observeDOM: true,
            ...options
        })
        scroll.value.on('scroll', (position) => {
            emit('scroll', position.y)
        })
    }

    onMounted(() => {
        initBScroll()
    })

    onUnmounted(() => {
        scroll.value.destroy()
    })
}
