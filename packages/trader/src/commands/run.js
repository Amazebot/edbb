'use strict'

// const config = require('../config')
const data = require('../data')
const execute = require('./_execute')

// Apurui/Marcy Gateway: 64 x Basic Medicines
// = SYSTEM / STATION : UNIT x COMMODITY,
function hopParts (hopString) {
  const regex = new RegExp(/([\w\s]+)\/([\w\s]+): ?(\d+) x ([\w\s]+),/, 'g')
  const [, system, station, unit, commodity] = regex.exec(hopString)
  return { system, station, unit, commodity }
}

async function run (from, toward) {
  const credits = await data.getCredits()
  const results = await execute(['run'], {
    toward,
    from,
    credits,
    capacity: '112',
    'ly-per': '30',
    hops: '2',
    planetary: 'N'
  })
  const notes = []
  const hops = []
  const summary = []
  for (const row of results) {
    if (row.startsWith('NOTE')) notes.push(row)
    else if (row.indexOf('->') >= 0) summary.push(row)
    else if (row.endsWith(',')) hops.push(hopParts(row))
    else summary.push(row)
  }
  return { notes, hops, summary }
}

module.exports = { run }
