const redis = require('redis')
const client = redis.createClient()

client.on('error', (err) => console.log('Redis error: ', err))

client.set('my test key', 'my test value', redis.print)
client.get('my test key', (error, result) => {
  if (error) throw error
  console.log('GET result ->', result)
})
