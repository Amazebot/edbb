'use strict'

const fuzzy = require('fuzzy')

async function fuzzySearch (_, input, source) {
  input = input || ''
  return new Promise((resolve) => {
    setTimeout(() => {
      const fuzzyResult = fuzzy.filter(input, source)
      resolve(fuzzyResult.map((el) => el.original))
    }, 100)
  })
}

module.exports = { fuzzySearch }
