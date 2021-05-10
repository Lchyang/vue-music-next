/* eslint-disable prefer-const */
import { ref, nextTick, watch } from 'vue'

export default function useFixed(props) {
  const groupRef = ref(null)
  const fixedTitle = ref('')
  const heightList = []
  let timer

  watch(() => props.data, async () => {
    await nextTick()
    calculateHeight()
  })

  function onScroll(value) {
    if (timer) { return }
    timer = setTimeout(() => {
        timer = null
        compare(value)
      }, 20)
  }

  function compare(val) {
    let value = -val
    for (let i = 0; i < heightList.length; i++) {
      if (value < heightList[i]) {
        fixedTitle.value = props.data[i].title
        break
      }
    }
    value <= 0 && (fixedTitle.value = '')
  }

  function calculateHeight() {
    heightList.length = 0
    const domList = groupRef.value.children
    for (let i = 0; i < domList.length; i++) {
      let totalHeight
      if (heightList.length) {
        totalHeight = heightList.slice(-1)[0] + domList[i].clientHeight
      }
      totalHeight = totalHeight || domList[i].clientHeight
      heightList.push(totalHeight)
    }
  }

  return {
    groupRef,
    onScroll,
    fixedTitle
  }
}
