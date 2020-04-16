const handleAction = require('./action')
const {
    handleJoin,
    handleFigtherSelected,
    handleReady,
    handleMatchmaking,
    handleChallengeResponse
} = require('./room')

module.exports = {
    handleMatchmaking,
    handleAction,
    handleJoin,
    handleFigtherSelected,
    handleReady,
    handleChallengeResponse
}