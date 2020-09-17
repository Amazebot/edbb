'use strict'

const inquirer = require('inquirer')
const config = require('../config')
const { sell } = require('../commands')
const { formatRows, fuzzySearch } = require('../helpers')
const { getPosition, commodities } = require('../data')

const sellCommodity = async function () {
  const position = await getPosition()
  const { commodity } = await inquirer.prompt({
    type: 'autocomplete',
    name: 'commodity',
    message: 'Commodity\n🥡 ',
    source: (_, input) => fuzzySearch(_, input, commodities)
  })
  const results = await sell(commodity, position)
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
  console.log(destination)
}

module.exports = { sellCommodity }
