'use strict'

const config = require('../config')
const { getPosition } = require('../api')
const { linesToJSON } = require('../helpers')
const execute = require('./_execute')

async function buy (item, position) {
  if (!position) position = await getPosition()
  const results = await execute(['buy', item], {
    near: position.system,
    limit: config.get('limit'),
    ly: '200'
  })
  return linesToJSON(results)
}

module.exports = { buy }
