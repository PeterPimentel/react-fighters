const handleJoin = (socket, io) => (data) => {
    console.log(`User - ${data.username} joining in room BATTLE`)
    socket.username = data.username
    socket.join('battle');
}

const handleFigtherSelected = (socket, io) => (data) => {
    console.log(`Enemy - ${data.username} is waiting for battle using ${data.figther.name}`)
    io.of('/').in('battle').clients(function (error, clients) {
        for (let i in clients) {
            if (socket.id !== clients[i]) {
                console.log("Sending data for opponent...")
                socket.to(clients[i]).emit('enemySelected', data);
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

const flipCoin = (socket, io) => () => {
    io.of('/').in('battle').clients(function (error, clients) {
        const coin = Math.random() < 0.5 ? 0 : 1
        socket.to('battle').emit('coinResult', clients[coin])
    })
}

module.exports = {
    handleJoin,
    handleFigtherSelected,
    handleReady
}
