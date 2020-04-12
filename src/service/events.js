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