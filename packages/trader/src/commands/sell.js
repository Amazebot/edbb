'use strict'

const config = require('../config')
const { getPosition } = require('../api')
const { linesToJSON } = require('../helpers')
const execute = require('./_execute')

async function sell (commodity, position) {
  if (!position) position = await getPosition()
  const results = await execute(['sell', commodity], {
    near: position.system,
    limit: config.get('limit'),
    'ly-per': 200,
    'price-sort': true
  })
  return linesToJSON(results)
}

module.exports = { sell }
