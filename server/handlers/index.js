const handleAction = require('./action')
const {
    handleJoin,
    handleFighterSelected,
    handleReady,
    handleMatchmaking,
    handleChallengeResponse
} = require('./room')

module.exports = {
    handleMatchmaking,
    handleAction,
    handleJoin,
    handleFighterSelected,
    handleReady,
    handleChallengeResponse
}