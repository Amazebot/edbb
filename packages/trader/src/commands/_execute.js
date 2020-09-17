'use strict'

const { spawn } = require('child_process')
const { resolve } = require('path')
const dargs = require('dargs')
const { chunksToLinesAsync, chomp } = require('@rauschma/stringio')
const config = require('../config')
const chalk = require('chalk')

const cwd = resolve(process.cwd(), 'Trade-Dangerous')

/** Executes python command with params, returns results array. */
async function execute (commands, params) {
  const args = dargs(params, { useEquals: false })
  const commandArgs = ['trade.py', ...commands, ...args]
  console.log('🔍 ' + chalk.cyan([...commands, ...args].join(' ')))
  if (config.get('dry')) return

  const stdio = ['ignore', 'pipe', process.stderr]
  const cp = spawn('python3.7', commandArgs, { cwd, stdio, encoding: 'utf8' })
  // console.log('📡 Result...')
  const lines = []
  for await (const line of chunksToLinesAsync(cp.stdout)) {
    // console.log(chalk.magenta(chomp(line)))
    lines.push(chomp(line).trim())
  }
  return lines
}

module.exports = execute
