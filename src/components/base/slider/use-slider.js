import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, ref, onUnmounted, onDeactivated, onActivated } from 'vue'

BScroll.use(Slide)

export default function userSlider(refWrapper) {
  const currentPageIndex = ref(0)
  let slider

  const initSlider = () => {
      slider = new BScroll(refWrapper.value, {
        scrollX: true,
        scrollY: false,
        slide: {
          threshold: 100
        },
        momentum: false,
        bounce: false,
        stopPropagation: true
      })

      slider.on('slideWillChange', (page) => {
        currentPageIndex.value = page.pageX
      })
  }
  onMounted(() => {
    initSlider()
  })
  onUnmounted(() => {
    slider.destroy()
  })

  onActivated(() => {
    slider.enable()
    slider.refresh()
  })

  onDeactivated(() => {
    slider.disable()
  })

  return {
    currentPageIndex
  }
}
