const handleJoin = (socket, io) => (data) => {
    console.log(`User - ${data.username} joining in room BATTLE`)
    socket.username = data.username
    socket.join('battle');
}

const handleFigtherSelected = (socket, io) => (data) => {
    console.log(`Enemy - ${data.username} is waiting for battle using ${data.figther.name}`)
    io.of('/').in('battle').clients(function(error,clients){
        console.log("CLIENTS ", clients)
        console.log("ID ", socket.id)
        for(let i in clients){
            if(socket.id !== clients[i]){
                console.log("Sending data for opponent...")
                socket.to(clients[i]).emit('enemySelected',data);
            }
        }
	})
}

module.exports = {
    handleJoin,
    handleFigtherSelected
}
