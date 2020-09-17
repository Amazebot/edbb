'use strict'

const inquirer = require('inquirer')
const chalk = require('chalk')
const { update } = require('../commands')

const manageData = async function () {
  const { operation } = await inquirer.prompt({
    type: 'list',
    name: 'operation',
    message: 'Operation\n🥡 ',
    choices: [
      { value: 'update', name: '📥 Update' }
    ]
  })
  switch (operation) {
    default:
    case 'update':
      const { notes } = await update()
      console.log(chalk.cyan(notes.pop()))
      break
  }
}

module.exports = { manageData }
