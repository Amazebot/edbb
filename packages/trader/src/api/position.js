'use strict'

const axios = require('axios')
const config = require('../config')
const api = 'https://www.edsm.net/api-logs-v1/get-position'

/** Get commander last position. */
async function getPosition () {
  const { data } = await axios.get(api, { params: {
    commanderName: config.get('commander-name'),
    apiKey: config.get('api-key')
  } })
  return data
}

module.exports = { getPosition }
