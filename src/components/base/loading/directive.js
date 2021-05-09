import { createApp } from 'vue'
import Loading from './loading'
import { addClass, removeClass } from '@/assets/js/dom'

const className = 'g-relative'

const loadingDirective = {
    mounted(el, binding) {
        const app = createApp(Loading)
        const instance = app.mount(document.createElement('div'))
        el.instance = instance
        if (binding.value) {
            append(el)
        }
    },
    updated(el, binding) {
        if (binding.value !== binding.oldValue) {
            binding.value ? append(el) : remove(el)
        }
    }
}
function append(el) {
    const style = getComputedStyle(el)
    debugger
    if (!['fixed', 'absolute', 'relitive'].includes(style.position)) {
        addClass(el, className)
    }
    el.appendChild(el.instance.$el)
}
function remove(el) {
    removeClass(el, className)
    el.removeChild(el.instance.$el)
}

export default loadingDirective
