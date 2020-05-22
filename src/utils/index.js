export function groupBy(array, prop) {
    return array.reduce(function(groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
}


export function getJsonParseOrArray(jsonStr) {
    try {
        return JSON.parse(jsonStr)
    } catch (e) {
        return []
    }
}
