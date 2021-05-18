
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

export function shuffle(source) {
    const array = source.slice()
    for (let i = 0; i < source.length; i++) {
        const j = getRandom(i)
        swap(array, i, j)
    }
    return array
}

function getRandom(max) {
    return Math.floor(Math.random() * (max + 1))
}

function swap(array, i, j) {
    const point = array[i]
    array[i] = array[j]
    array[j] = point
}

export function formatTime(time) {
    time = Math.floor(time)
    const minute = (Math.floor((time / 60)) + '').padStart(2, '0')
    const second = ((time % 60) + '').padStart(2, '0')
    return minute + ':' + second
}
