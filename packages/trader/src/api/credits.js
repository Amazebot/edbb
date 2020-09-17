'use strict'

const axios = require('axios')
const config = require('../config')
const api = 'https://www.edsm.net/api-commander-v1/get-credits'

/** Get Commander's wallet stats. */
async function getCredits () {
  const { data } = await axios.get(api, { params: {
    commanderName: config.get('commander-name'),
    apiKey: config.get('api-key')
  } })
  return data
}

/** Get the balance from credit result. */
async function getBalance () {
  const { credits } = await getCredits()
  return credits[0].balance
}

module.exports = { getCredits, getBalance }
