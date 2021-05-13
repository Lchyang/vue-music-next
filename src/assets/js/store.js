import goodStore from 'good-storage'

export function save(key, item) {
    const list = goodStore.get(key) || []
    list.unshift(item)
    goodStore.set(key, list)
    return list
}
export function remove(key, compare) {
    const list = goodStore.get(key)
    const index = findItem(list, compare)
    if (index > -1) {
        list.splice(index, 1)
    }
    goodStore.set(key, list)
    return list
}

export function findItem(list, compare) {
    return list.findIndex(compare)
}

export function load(key) {
    return goodStore.get(key) || []
}
