import { ref, onMounted, nextTick } from 'vue'
export default function useFixed() {
  const groupRef = ref(null)
  const heightList = []
  function calculateHeight() {
    heightList.length = 0
    const domList = groupRef.value.children
    for (let i = 0; i < domList.length; i++) {
      heightList.push(domList[i].clientHeight)
    }
    console.log(heightList)
  }
  onMounted(async () => {
    await nextTick()
    calculateHeight()
  })

  return {
    groupRef
  }
}
