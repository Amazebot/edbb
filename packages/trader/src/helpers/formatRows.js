'use strict'

/* Format array of object attributes as column spaced rows with header row. */
function formatRows (tabluarData = [{}]) {
  // Get largest width for each attribute in array of objects.
  const columnWidths = tabluarData.reduce((memo, item) => {
    for (const key in item) {
      const lastWidth = memo[key] ? memo[key] : 0
      const currentWidth = item[key].toString().length
      if (currentWidth > lastWidth) memo[key] = currentWidth
    }
    return memo
  }, {})
  // If key itself is longer than largest value, use that length.
  for (const key in tabluarData[0]) {
    if (key.length > columnWidths[key]) columnWidths[key] = key.length
  }
  // First row joins keys as headers spaced by column width.
  const header = Object.keys(tabluarData[0]).map((key) => {
    return key.toString().padEnd(columnWidths[key], '.')
  }).join('..')
  // Follow with each item as a string with column spaced values.
  const rows = tabluarData.map((item) => {
    return Object.keys(item).map((key) => {
      return item[key].toString().padEnd(columnWidths[key])
    }).join('  ')
  })
  return [header, ...rows]
}

module.exports = { formatRows }
