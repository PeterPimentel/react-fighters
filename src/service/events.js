import io from 'socket.io-client';

let socket

export const connect = () => socket = io.connect()

export const removeAllListeners = () => socket.removeAllListeners()

export const emitJoin = (username) => {
    socket.emit('joinInGame', username);
}

export const action = (action) => {
    socket.emit('action', action);
}

export const onAction = (callback) => {
    console.log("Called - onAction")
    socket.on('actionReceived', function(data){
        callback(data)
    });
}

export const emitFigtherSelected = (data) => {
    console.log("CALLED - emitFigtherSelected")
    socket.emit('figtherSelected', data)
}

export const onEnemySelected = (callback) => {
    console.log("Called - onEnemySelected")
    socket.on('enemySelected', function(data){
        callback(data)
    });
}

export const emitReady = () => {
    socket.emit('ready', true)
}

export const onReady = (callback) => {
    console.log("Called - onEnemySelected")
    socket.on('enemyReady', function(status){
        callback(status)
    });
}