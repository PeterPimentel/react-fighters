const handleJoin = (socket, io) => (data) => {
    console.log(`User - ${data.username} joining in room BATTLE`)
    socket.username = data.username
    socket.searching = true
    socket.join('battle')
    // socket.to('battle').emit('userJoin', {socketId:socket.id, username:data.username})
}

const handleFigtherSelected = (socket, io) => (data) => {
    console.log(`Enemy - ${data.username} is waiting for battle using ${data.fighter.name}`)
    io.of('/').in('battle').clients(function (error, clients) {
        for (let i in clients) {
            if (socket.id !== clients[i]) {
                const response = {
                    ...data,
                    socketId: socket.id
                }
                console.log("Sending data for opponent...", response)
                socket.to(clients[i]).emit('enemySelected', response);
            }
        }
    })
}

const handleReady = (socket, io) => (status) => {
    console.log(`Enemy is ready`)
    io.of('/').in('battle').clients(function (error, clients) {
        for (let i in clients) {
            if (socket.id !== clients[i]) {
                console.log("Sending data for opponent...")
                socket.to(clients[i]).emit('enemyReady', status);
            }
        }
    })
}

const handleChallenge = (socket, io) => (data) => {
    console.log(`User - ${data.user.username} started matchmaking`)
    io.of('/').in('battle').clients(function (error, clients) {
        let username = 'Anonymous'
        const opponent = clients.find(id => {
            if (socket.id !== id) {
                if (io.sockets.connected[id] && io.sockets.connected[id].searching) {
                    username = io.sockets.connected[id].username
                    io.sockets.connected[id].searching = false
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        })
        //TODO tratar quando não achar uma partida
        if (opponent) {
            socket.to(opponent).emit('challengeReceived', { opponent: data.user })
            io.to(socket.id).emit('challengeReceived', {
                opponent: {
                    username,
                    socketId: opponent
                }
            })
        }
    })
}

const handleChallengeResponse = (socket, io) => (response) => {
    console.log(`Challenge Accept - ${response.response}`)
    socket.to(response.to.socketId).emit('challengeResponse', response)
}

module.exports = {
    handleJoin,
    handleFigtherSelected,
    handleReady,
    handleChallenge,
    handleChallengeResponse
}
