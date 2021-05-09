<template>
<div ref="scrollRef">
    <slot></slot>
</div>
</template>

<script>
import { ref } from 'vue'
import userScroll from './user-scroll'
export default {
    name: 'scroll',
    props: {
        click: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const scrollRef = ref(null)
        userScroll(scrollRef, props)
        return {
            scrollRef
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
