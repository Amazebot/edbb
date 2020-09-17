'use strict'

const inquirer = require('inquirer')
const config = require('../config')
const { buy } = require('../commands')
const { formatRows, fuzzySearch } = require('../helpers')
const { getPosition, shipNames } = require('../data')
const { tradeRun } = require('./tradeRun')

const findShip = async function () {
  const position = await getPosition()
  const { ship } = await inquirer.prompt({
    type: 'autocomplete',
    suggestOnly: true,
    name: 'ship',
    message: 'Ship\n🚀 ',
    source: (_, input) => fuzzySearch(_, input, shipNames)
  })
  const results = await buy(ship, position)
  const [header, ...stations] = formatRows(results)
  const { station } = await inquirer.prompt({
    type: 'list',
    pageSize: config.get('limit'),
    ly: '300',
    name: 'station',
    message: header,
    choices: stations
  })
  const destination = results[stations.indexOf(station)]
  return tradeRun(destination.Station)
}

module.exports = { findShip }
