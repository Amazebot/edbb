'use strict'

const execute = require('./_execute')

async function update () {
  const results = await execute(['import'], { plug: 'eddblink' })
  const notes = []
  for (const row of results) {
    if (row.startsWith('NOTE')) notes.push(row)
  }
  return { notes }
}

module.exports = { update }
