require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')

const handlers = require('./server/handlers')
const routes = require('./server/routes')

const Log  = require('./server/util/Log')

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/static', express.static('assets'))

app.use("/api", routes)

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


io.on('connection', function (socket) {
  socket.on('action', handlers.handleAction(socket, io))
  socket.on('joinInGame', handlers.handleJoin(socket, io))
  socket.on('figtherSelected', handlers.handleFigtherSelected(socket, io))
  socket.on('ready', handlers.handleReady(socket, io))
  socket.on('challenge', handlers.handleChallenge(socket, io))
  socket.on('challengeResponse', handlers.handleChallengeResponse(socket, io))
})

const PORT = process.env.PORT || 8080 

http.listen(PORT)

Log.trace(`Server running on port - ${PORT}`)
