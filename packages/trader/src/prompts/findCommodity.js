'use strict'

const inquirer = require('inquirer')
const config = require('../config')
const { buy } = require('../commands')
const { formatRows, fuzzySearch } = require('../helpers')
const { getPosition, commodities } = require('../data')
const { tradeRun } = require('./tradeRun')

const findCommodity = async function () {
  const position = await getPosition()
  const { commodity } = await inquirer.prompt({
    type: 'autocomplete',
    // suggestOnly: true,
    name: 'commodity',
    message: 'Commodity\n🥡 ',
    source: (_, input) => fuzzySearch(_, input, commodities)
  })
  const results = await buy(commodity, position)
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

module.exports = { findCommodity }
