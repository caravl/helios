const express = require('express')
const app = express()
const path = require('path')

const apiai = require('apiai')('5bb200822009472b812baeac80a4b837')

app.use(express.static(path.join(__dirname, '.', '/views')))
app.use(express.static(path.join(__dirname, '.', 'public')))

const server = app.listen(5000)

const io = require('socket.io')(server)

app.get('/', (req, res) => {
  console.log('listening on port 5000')
  res.sendFile('index.html')
})

io.on('connection', function(socket) {
  console.log('io on connection')
  socket.on('chat message', (text) => {
    console.log('socket', text)
    let apiaiReq = apiai.textRequest(text, {
      sessionId: 'APIAI_SESSION_ID'
    })

    apiaiReq.on('response', (response) => {

      let aiText = response.result.fulfillment.speech
      socket.emit('bot reply', aiText)
      console.log('send reply back to browser')
    })

    apiaiReq.on('error', (error) => {
      console.log('error: ', error)
    })

    apiaiReq.end()

  })

})
