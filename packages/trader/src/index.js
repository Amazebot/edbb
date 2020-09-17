'use strict'

const inquirer = require('inquirer')
const config = require('./config')
const prompts = require('./prompts')
const data = require('./data')

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

async function menu () {
  const location = await data.getLocation()
  console.log(`‍👨‍🚀 ${location}`)
  const { prompt } = await inquirer.prompt({
    type: 'list',
    name: 'prompt',
    message: `📖 Menu`,
    choices: [
      { value: 'findCommodity', name: '🥡  Find Commodity' },
      { value: 'sellCommodity', name: '💰 Sell Commodity' },
      { value: 'findShip', name: '🚀 Find Ship' },
      { value: 'tradeRun', name: '🚢 Trade Run' },
      { value: 'manageData', name: '💁 Manage Data' }
    ]
  })
  await prompts[prompt]()
  return menu()
}

config.load()
menu()
