const cors = require('cors')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

mongoose.connect('mongodb://omnistack:omnistack@omnistack-shard-00-00-msryz.mongodb.net:27017,omnistack-shard-00-01-msryz.mongodb.net:27017,omnistack-shard-00-02-msryz.mongodb.net:27017/semana09?ssl=true&replicaSet=OmniStack-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true, bufferCommands:false } )
// mongoose.set('bufferCommands', false);

const app = express()
const server = http.Server(app)
const io = socketio(server)

const connectedUsers = {}

io.on('connection', socket => {
    
    const {user_id} = socket.handshake.query

    connectedUsers[user_id] = socket.id
})

app.use((req,res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(3001)