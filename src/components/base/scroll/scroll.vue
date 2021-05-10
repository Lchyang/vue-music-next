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
        },
        probeType: {
            type: Number,
            default: 0
        }
    },
    emits: ['scroll'],
    setup(props, context) {
        const scrollRef = ref(null)
        userScroll(scrollRef, props, context)
        return {
            scrollRef
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
