export function addClass(el, className) {
    const classList = el.classList
    if (!classList.contains(className)) {
        classList.add(className)
    }
}

export function removeClass(el, className) {
    el.classList.remove(className)
}
