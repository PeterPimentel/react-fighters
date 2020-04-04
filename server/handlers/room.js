const handleJoin = (socket, io) => (data) => {
    console.log(`User - ${data.username} joining in room BATTLE`)
    socket.username = data.username
    socket.join('battle')
}

const handleFigtherSelected = (socket, io) => (data) => {
    console.log(`Enemy - ${data.username} is waiting for battle using ${data.fighter.name}`)
    io.of('/').in('battle').clients(function (error, clients) {
        for (let i in clients) {
            if (socket.id !== clients[i]) {
                const response = {
                    ...data,
                    socketId:socket.id
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

module.exports = {
    handleJoin,
    handleFigtherSelected,
    handleReady
}
