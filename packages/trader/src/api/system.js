'use strict'

const axios = require('axios')
const config = require('../config')
const api = 'https://www.edsm.net/api-system-v1'

/** Get commander last position. */
async function getStations (systemName) {
  const { data } = await axios.get(`${api}/stations`, { params: {
    commanderName: config.get('commander-name'),
    apiKey: config.get('api-key'),
    systemName
  } })
  return data.stations
}

module.exports = { getStations }
