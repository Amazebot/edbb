const { formatRows } = require('./formatRows')

/** @todo replace with tests */
const mocks = [
  { a: '123', b: '123456', ccccccccc: 1 },
  { a: '1234', b: '123', ccccccccc: false }
]

console.log(formatRows(mocks))
/**
 *   columnWidths: { a: 4, b: 6, ccccccccc: 9 } }
 *   result: [ 'a.....b.......ccccccccc',
 *             '123   123456  1        ',
 *             '1234  123     false    ' ]
*/
