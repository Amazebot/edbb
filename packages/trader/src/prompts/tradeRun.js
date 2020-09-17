'use strict'

const inquirer = require('inquirer')
const chalk = require('chalk')
const { run } = require('../commands')
const data = require('../data')

async function inputDestination () {
  const { destination } = await inquirer.prompt({
    type: 'input',
    name: 'destination',
    message: 'Destination\n🛰️ '
  })
  return destination
}

const tradeRun = async function (destination) {
  const location = await data.getLocation()
  if (!destination) destination = await inputDestination()
  const route = await run(location, destination)
  for (const line of route.summary) console.log(chalk.cyan(line))
  console.log({ hops: route.hops })
}

module.exports = {
  tradeRun
}
