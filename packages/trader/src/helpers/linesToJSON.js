'use strict'

const chalk = require('chalk')

/** Convert printed table array of strings to JSON object. */
function linesToJSON (lines = []) {
  if (lines.length < 2) {
    throw new Error(`Output not a result table: \n${chalk.red(lines.join('\n'))}`)
  }
  if (lines[1].indexOf('---') < 0) {
    throw new Error(`Unexpected result format: \n${chalk.red(lines.join('\n'))}`)
  }
  const valueRows = lines.map((line) => line.split('|').map(str => str.trim()))
  const [titleRow, , ...resultRows] = valueRows
  const results = resultRows.map((result) => {
    return result.reduce((memo, value, index) => {
      memo[titleRow[index]] = value
      return memo
    }, {})
  })
  return results
}

module.exports = { linesToJSON }
