'use strict'

const commodities = require('./commodities')
const shipNames = require('./ship-names')
const api = require('../api')
const { locationString } = require('../helpers')

const data = {
  commodities,
  shipNames,
  async getPosition () {
    if (!this.position) {
      this.position = await api.getPosition()
    }
    return this.position
  },
  async getLocation () {
    if (!this.location) {
      const position = await this.getPosition()
      this.location = await locationString(position)
    }
    return this.location
  },
  async getCredits () {
    if (!this.credits) {
      this.credits = await api.getBalance()
    }
    return this.credits
  }
}

module.exports = data
