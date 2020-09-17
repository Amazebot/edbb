'use strict'

const { Config } = require('@amazebot/config')

const prefix = 'trader'
const config = new Config({
  'api-key': {
    type: 'string',
    description: 'Your EDSM API key - registration required',
    required: true
  },
  'commander-name': {
    type: 'string',
    description: 'Your name please cmdr o7',
    required: true
  },
  'limit': {
    type: 'string',
    description: 'Number of results to return from queries.',
    default: '9'
  },
  'dry': {
    type: 'boolean',
    description: 'Dry run queries without executing in Python.',
    default: false
  }
}, prefix)

module.exports = config
