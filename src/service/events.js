import io from 'socket.io-client'
import Log from '../util/Log'

let socket

export const connect = () => socket = io.connect()

export const removeAllListeners = () => {
    Log.trace('removeAllListeners','enventService')
    socket.removeAllListeners()
}

export const emitJoin = (username) => {
    Log.trace('joinInGame','enventService')
    socket.emit('joinInGame', username)
}

export const action = (action) => {
    socket.emit('action', action)
}

export const onAction = (callback) => {
    socket.on('actionReceived', function (data) {
        callback(data)
    })
}

export const emitFigtherSelected = (data) => {
    socket.emit('figtherSelected', data)
}

export const onEnemySelected = (callback) => {
    socket.on('enemySelected', function (data) {
        callback(data)
    })
}

export const emitReady = () => {
    socket.emit('ready', true)
}

export const onReady = (callback) => {
    socket.on('enemyReady', function (status) {
        callback(status)
    })
}

export const subscribeToUsersList = (cb) => {
    Log.trace('subscribeToUsersList','enventService')
    socket.on('userJoin',cb)
}

export const subscribeToMatchs = (cb) => {
    Log.trace('subscribeToMatchs','enventService')
    socket.on('challengeReceived',cb)
}

export const emitChallenge = (data) => {
    Log.trace('emitChallenge','enventService')
    socket.emit('challenge', {...data, user:{...data.user, socketId:socket.id}})
}

export const emitChallengeResponse = (response) => {
    //set the socket ID
    response.from.socketId = socket.id
    
    socket.emit('challengeResponse', response)
}

export const subscribeToChallengeResponse = (cb) => {
    socket.on('challengeResponse', cb)
}
