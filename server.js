const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const bodyParser = require('body-parser')

const handlers = require('./server/handlers')
const routes = require('./server/routes')

app.use((req, res, next) => {
  req.io = io;
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/static', express.static('assets'))

app.use("/api", routes)

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});


io.on('connection', function (socket) {
  socket.on('action', handlers.handleAction(socket, io));
  socket.on('joinInGame', handlers.handleJoin(socket, io));
  socket.on('figtherSelected', handlers.handleFigtherSelected(socket, io));
  socket.on('ready', handlers.handleReady(socket, io));
});

http.listen(process.env.PORT || 8080);
