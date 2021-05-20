import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'

export default function useCd() {
    const store = useStore()
    const cdRef = ref(null)
    const cdImageRef = ref(null)

    const playing = computed(() => store.state.playing)

    const cdCls = computed(() => {
        return playing.value ? 'playing' : ''
    })

    watch(playing, (newPlaying) => {
        if (!newPlaying) {
            syncTransform(cdRef.value, cdImageRef.value)
        }
    })

    // 获取子元素的样式之后赋值给父元素，当图片停止的时候样式不会变
    function syncTransform(wrapper, inner) {
        const wrapperTransform = getComputedStyle(wrapper).transform
        const innerTransform = getComputedStyle(inner).transform
        wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
    }

    return {
        cdCls,
        cdRef,
        cdImageRef
    }
}
