
const index = (req, res) => {
    req.io.of('/').in('battle').clients(function (error, clients) {
        const conectedUsers = clients.map(client => {
            let username = 'Anonymous'
            if(req.io.sockets.connected[client]){
                username = req.io.sockets.connected[client].username
            }
            return {
                username,
                socketId:client
            }
        })
        res.send(conectedUsers)
    })
}

module.exports = {
    index
}