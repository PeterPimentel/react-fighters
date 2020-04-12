const effectService = require('./effectService')
const attackService = require('./attackService')
const reserveService = require('./reserveService')
const supporterService = require('./supporterService')

const _log = (level, { action, origin, target, result }) => {
    console.log(`${level}...`)
    console.log(`\n ${level} - action${JSON.stringify(action)}`)
    console.log(`\n ${level} - Origin ${JSON.stringify(origin)}`)
    console.log(`\n ${level} - target ${JSON.stringify(target)}`)
    console.log(`\n ${level} - RESULT ${JSON.stringify(result)}`)
    console.log("------------------------------")
}

const handle = (action, origin, target) => {
    if (action.type === "skip") {
        return {
            result: [{ affected: "endTurn" }],
            action
        }
    }

    if (action.type === "figtherFromReserve") {
        return {
            result: reserveService.figtherFromReserve(origin, target),
            action
        }
    }

    if (action.type === "attack") {
        const { skill } = action
        return {
            result: attackService.triggerAttack(origin, target, skill),
            action,
            origin
        }
    }

    if (action.type === "reserve") {
        return {
            result: reserveService[action.action](origin, target),
            action,
            origin
        }
    }

    if (action.type === "supporter") {
        return {
            result: supporterService.trigger(origin, target),
            action,
            origin
        }
    }

    if (action.type === "energy") {
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
        // _log("INPUT", req.body)
        const result = handle(action, origin, target)
        _log("OUTPUT", result)
        req.io.to(action.to).emit('actionReceived', result)
        res.json(result)
        
    } catch (error) {
        console.log("DEU RUIMMMM", error)
    }
}

module.exports = {
    handleAction
}