const effectService = require('./effectService')
const attackService = require('./attackService')
const reserveService = require('./reserveService')
const supporterService = require('./supporterService')

const { actionstypes, affectedTypes } = require('../contants')

const Log = require('../util/Log')

const handle = (action, origin, target) => {

    switch (action.type) {
        case actionstypes.SKIP:
            return {
                result: [{ affected: affectedTypes.TURN_END }],
                action
            }
        case actionstypes.FIGHTER_FROM_RESERVE:
            return {
                result: reserveService.figtherFromReserve(origin, target),
                action
            }
        case actionstypes.ATTACK:
            const { skill } = action
            return {
                result: attackService.triggerAttack(origin, target, skill),
                action,
                origin
            }
        default:
            break;
    }



    if (action.type === actionstypes.SKIP) {
        return {
            result: [{ affected: affectedTypes.TURN_END }],
            action
        }
    }

    if (action.type === actionstypes.FIGHTER_FROM_RESERVE) {
        return {
            result: reserveService.figtherFromReserve(origin, target),
            action
        }
    }

    if (action.type === actionstypes.ATTACK) {
        const { skill } = action
        return {
            result: attackService.triggerAttack(origin, target, skill),
            action,
            origin
        }
    }

    if (action.type === actionstypes.RESERVE) {
        return {
            result: reserveService[action.action](origin, target),
            action,
            origin
        }
    }

    if (action.type === actionstypes.SUPPORTER) {
        return {
            result: supporterService.trigger(origin, target),
            action,
            origin
        }
    }

    if (action.type === actionstypes.ENERGY) {
        const { effect } = origin
        return {
            result: effectService[effect](origin, target),
            action,
            origin
        }
    }
}

const handleAction = (req, res) => {
    try {
        const { action, origin, target } = req.body
        Log.trace(action.type, "handleAction - INPUT")

        const result = handle(action, origin, target)
        Log.trace(result, "handleAction - OUTPUT")

        req.io.to(action.to).emit('actionReceived', result)
        res.json(result)

    } catch (error) {
        Log.error(error, 'handleAction')
    }
}

module.exports = {
    handleAction
}