const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, '.', '/views'))) // serves up html

app.use(express.static(path.join(__dirname, '.', 'public'))) // serves up css, images, js

const server = app.listen(5000)

app.get('/', (req, res) => {
  res.sendFile('index.html')
})
