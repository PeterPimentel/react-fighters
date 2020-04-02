const handleAction = (socket, io) => (action) => {
    console.log(`Enemy - added a energy on fighter`)
    io.of('/').in('battle').clients(function(error,clients){
        for(let i in clients){
            if(socket.id !== clients[i]){
                console.log("Sending data for opponent...")
                socket.to(clients[i]).emit('actionReceived',action);
            }
        }
	})
}

module.exports = handleAction
