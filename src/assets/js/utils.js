
export function debounce(func, wait) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

export function throttle(func, wait) {
    let timer
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                func.apply(this, args)
            }, wait)
        }
    }
}
