import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const className = 'g-relative'

export default function createLoadingLikeDirective(component) {
    return {
        mounted(el, binding) {
            const app = createApp(component)
            const instance = app.mount(document.createElement('div'))
            const name = component.name
            if (!el[name]) {
                el[name] = {}
            }
            el[name].instance = instance
            const arg = binding.arg
            if (arg !== undefined) {
                instance.setTitle(arg)
            }
            if (binding.value) {
                append(el)
            }
        },
        updated(el, binding) {
            const arg = binding.arg
            const name = component.name
            if (arg !== undefined) {
                el[name].instance.setTitle(arg)
            }
            if (binding.value !== binding.oldValue) {
                binding.value ? append(el) : remove(el)
            }
        }
    }
    function append(el) {
        const name = component.name
        const style = getComputedStyle(el)
        if (!['fixed', 'absolute', 'relitive'].includes(style.position)) {
            addClass(el, className)
        }
        el.appendChild(el[name].instance.$el)
    }

    function remove(el) {
        const name = component.name
        removeClass(el, className)
        el.removeChild(el[name].instance.$el)
    }
}
