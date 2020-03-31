import io from 'socket.io-client';

let socket

export const connect = () => socket = io.connect()

export const action = (action) => {
    socket.emit('action', action);
}

export const join = (username) => {
    socket.emit('joinInGame', username);
}

export const replyMyFigtherData = (data) => {
    console.log("CALLED - replyMyFigtherData")
    socket.emit('replyMyFigtherData', data)
}

export const onOpponentReady = (callback) => {
    console.log("Called --- onOpponentReady")
    socket.on('enemyJoin', function(data){
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

export const onFigtherData = (callback) => {
    console.log("Called --- onFigtherData")
    socket.on('figtherData', function(data){
        callback(data)
    });
}
