const express = require('express')
const app = express()
const path = require('path')

// hook up our Node.js app to API.AI token
const apiai = require('apiai')('5bb200822009472b812baeac80a4b837')

// serve up html, css, images, js
app.use(express.static(path.join(__dirname, '.', '/views')))
app.use(express.static(path.join(__dirname, '.', 'public')))

// our server
const server = app.listen(5000)

// sockets
const io = require('socket.io')(server)

// servers up our html when going to localhost:5000/
app.get('/', (req, res) => {
  console.log('listening on port 5000')
  res.sendFile('index.html')
})

// --------- SOCKETS LISTENING --------- //

// server side sockets to listen for and receive the emit with the speech recognition
io.on('connection', function(socket) {
  console.log('io on connection')
  socket.on('chat message', (text) => {
    // take the text emited with 'chat message'
    // get a reply from API.AI
    console.log('socket', text)
    let apiaiReq = apiai.textRequest(text, {
      sessionId: 'APIAI_SESSION_ID'
    })

    apiaiReq.on('response', (response) => {

      let aiText = response.result.fulfillment.speech
      socket.emit('bot reply', aiText) // send result back to browser
    })

    apiaiReq.on('error', (error) => {
      console.log('error: ', error)
    })

    // apiaiReq.end()

  })

})
