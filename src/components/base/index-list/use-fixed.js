/* eslint-disable prefer-const */
import { ref, nextTick, watch, computed } from 'vue'
import { throttle } from '@/assets/js/utils'

export default function useFixed(props) {
  const groupRef = ref(null)
  const fixedTitle = ref('')
  const scrollY = ref(0)
  const heightList = []
  const fixedIndex = ref(0)
  const TITLEHEIGHT = 30

  watch(() => props.data, async () => {
    await nextTick()
    calculateHeight()
  })

  function onScroll(value) {
    scrollY.value = -value
  }

  const fixedStyle = computed(() => {
    let distanceVal = heightList[fixedIndex.value] - scrollY.value
    let diff = distanceVal < TITLEHEIGHT ? distanceVal - TITLEHEIGHT : 0
    return {
      transform: `translate(0, ${diff}px)`
    }
  })

  watch(scrollY, throttle((value) => {
    for (let i = 0; i < heightList.length; i++) {
      if (value < heightList[i]) {
        fixedIndex.value = i
        fixedTitle.value = props.data[i].title
        break
      }
    }
    value < 0 && (fixedTitle.value = '')
  }, 10))

  function calculateHeight() {
    const domList = groupRef.value.children
    let totalHeight = 0
    heightList.length = 0
    for (let i = 0; i < domList.length; i++) {
      totalHeight += domList[i].clientHeight
      heightList.push(totalHeight)
    }
  }

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle
  }
}
