import { computed, ref } from 'vue'
export default function useShorcut(props, groupRef) {
  const ITEMHEIGHT = 18
  const scrollRef = ref(null)

  const shortcutList = computed(() => {
    return props.data.map((item) => {
      return item.title
    })
  })

  const touch = {}

 function onShortcutTouchStart (event) {
   const anchorIndex = parseInt(event.target.dataset.index)
   touch.startY = event.touches[0].pageY
   touch.anchorIndex = anchorIndex
   scrollTo(anchorIndex)
 }

 function onShortcutTouchMove (event) {
   touch.endY = event.touches[0].pageY
   const delta = (touch.endY - touch.startY) / ITEMHEIGHT | 0
   const anchorIndex = touch.anchorIndex + delta
   scrollTo(anchorIndex)
 }

 function scrollTo (index) {
   index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
   const element = groupRef.value.children[index]
   const scroll = scrollRef.value.scroll
   scroll && scroll.scrollToElement(element, 0)
 }

  return {
    scrollRef,
    shortcutList,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
