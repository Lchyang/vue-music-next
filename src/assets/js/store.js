import goodStore from 'good-storage'

export function save(key, item, compare, maxlen = 100) {
    let list = goodStore.get(key, [])
    list = insertArray(list, item, compare, maxlen)
    goodStore.set(key, list)
    return list
}

export function remove(key, compare) {
    const list = goodStore.get(key, [])
    const index = list.findIndex(compare)
    if (index > -1) {
        list.splice(index, 1)
    }
    goodStore.set(key, list)
    return list
}

function insertArray(list, item, compare, maxlen) {
    const index = list.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        list.splice(index, 1)
    }
    list.unshift(item)
    if (list.length > maxlen) {
        list.pop()
    }
    return list
}

export function load(key) {
    return goodStore.get(key, [])
}
