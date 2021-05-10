/* eslint-disable prefer-const */
import { ref, nextTick, watch } from 'vue'
import { throttle } from '@/assets/js/utils'

export default function useFixed(props) {
  const groupRef = ref(null)
  const fixedTitle = ref('')
  const scrollY = ref(0)
  const heightList = []

  watch(() => props.data, async () => {
    await nextTick()
    calculateHeight()
  })

  function onScroll(value) {
    scrollY.value = -value
  }

  watch(scrollY, throttle((value) => {
    for (let i = 0; i < heightList.length; i++) {
      if (value < heightList[i]) {
        fixedTitle.value = props.data[i].title
        break
      }
    }
    value <= 0 && (fixedTitle.value = '')
  }, 20))

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
    fixedTitle
  }
}
