import { computed, ref, watch } from 'vue'
export default function useShorcut(props, groupRef) {
  const ITEMHEIGHT = 18
  const currentIndex = ref(0)
  const startY = ref(0)
  const endY = ref(0)
  const diff = ref(0)
  const scrollRef = ref(null)

  const shortcutList = computed(() => {
    return props.data.map((item) => {
      return item.title
    })
  })

 function onShortcutTouchStart (event) {
   const touch = event.touches[0]
   const text = touch.target.innerText
   startY.value = touch.clientY
   if (text.length === 1) {
     currentIndex.value = shortcutList.value.findIndex((item) => {
       return item === text
     })
   }
   scrollTo()
 }

 function onShortcutTouchMove (event) {
   const touch = event.touches[0]
   endY.value = touch.clientY
   diff.value = Math.floor((endY.value - startY.value) / ITEMHEIGHT)
 }

 watch(diff, (newValue, oldValue) => {
   if (newValue > oldValue) {
      currentIndex.value += 1
   } else {
      currentIndex.value -= 1
   }
   if (currentIndex.value < 0 || currentIndex.value > shortcutList.value.length - 1) {
     return
   }
   scrollTo()
 })

 function scrollTo () {
   const element = groupRef.value.children[currentIndex.value]
   const scroll = scrollRef.value.scroll
   scroll && scroll.scrollToElement(element, 100)
 }

  return {
    scrollRef,
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
