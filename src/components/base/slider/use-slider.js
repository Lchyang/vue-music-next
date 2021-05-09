import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, ref, onUnmounted, onDeactivated, onActivated } from 'vue'

BScroll.use(Slide)

export default function userSlider(refWrapper) {
  const currentPageIndex = ref(0)
  const slider = ref(null)

  const initSlider = () => {
      slider.value = new BScroll(refWrapper.value, {
        scrollX: true,
        scrollY: false,
        slide: {
          threshold: 100
        },
        momentum: false,
        bounce: false,
        stopPropagation: true
      })

      slider.value.on('slideWillChange', (page) => {
        currentPageIndex.value = page.pageX
      })
  }
  onMounted(() => {
    initSlider()
  })
  onUnmounted(() => {
    slider.value.destroy()
  })

  onActivated(() => {
    slider.value.enable()
    slider.value.refresh()
  })

  onDeactivated(() => {
    slider.value.disable()
  })

  return {
    slider,
    currentPageIndex
  }
}
