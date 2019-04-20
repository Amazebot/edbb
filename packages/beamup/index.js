const WebSocket = require('ws')
const socket = new WebSocket('ws://192.168.86.179:31337')

socket.on('message', (data) => {
  console.log(data)
  // const { payload } = JSON.parse(data)
  // if (payload.event === 'Fileheader') {
  //   console.log(`${payload.timestamp} part ${payload.part}`)
  // } else {
  //   console.log(`${payload.event} triggered`)
  // }
})
