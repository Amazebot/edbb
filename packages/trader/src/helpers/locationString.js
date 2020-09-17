'use strict'

/** Get commander last position as argument string. */
function locationString (position) {
  return `${position.system}${position.station ? '/' + position.station : ''}`
}

module.exports = {
  locationString
}
