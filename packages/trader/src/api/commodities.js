'use strict'

const axios = require('axios')
const config = require('../config')
const { getPosition } = require('./position')
const { getStations } = require('./system')
const api = 'https://www.edsm.net/api-system-v1/stations/market'

async function getFirstMarketStation (systemName) {
  const stations = await getStations(systemName)
  for (let { haveMarket, name } of stations) {
    if (haveMarket) return name
  }
}

async function getCommodities (position) {
  if (!position) position = await getPosition()
  if (!position.station) position.station = await getFirstMarketStation(position.system)
  console.log(`Get commodity listing for market at ${position.system}/${position.station}`)
  const params = {
    apiKey: config.get('api-key'),
    systemName: position.system,
    stationName: position.station
  }
  const { data } = await axios.get(api, { params })
  return data.commodities
}

/** Get commander last position as argument string. */
async function getCommodityNames (position) {
  const commodities = await getCommodities(position)
  if (Array.isArray(commodities) && commodities.length > 0) {
    return commodities.map(c => c.name)
  } else {
    console.log('No commodities found in market at current position.')
    return []
  }
}

module.exports = { getCommodities, getCommodityNames, getFirstMarketStation }
