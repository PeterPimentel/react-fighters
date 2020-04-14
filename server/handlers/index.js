const handleAction = require('./action')
const {
    handleJoin,
    handleFigtherSelected,
    handleReady,
    handleChallenge,
    handleChallengeResponse
} = require('./room')

module.exports = {
    handleChallenge,
    handleAction,
    handleJoin,
    handleFigtherSelected,
    handleReady,
    handleChallengeResponse
}