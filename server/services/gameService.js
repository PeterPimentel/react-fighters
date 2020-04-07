const effectService = require('./effectService')
const attackService = require('./attackService')
const reserveService = require('./reserveService')
const supporterService = require('./supporterService')

const _log = (level, { action, origin, target, result }) => {
    console.log(`${level}...`)
    console.log(`\n ${level} - action ${action.type}`)
    console.log(`\n ${level} - Origin ${JSON.stringify(origin)}`)
    console.log(`\n ${level} - target ${JSON.stringify(target)}`)
    console.log(`\n ${level} - RESULT ${JSON.stringify(result)}`)
    console.log("------------------------------")
}

const handle = (action, origin, target) => {
    if (action.type === "skip") {
        return { action }
    }
    if (action.type === "reserve") {
        const reserve = reserveService[action.action](origin, target)
        return {
            result: reserve,
            action
        }
    }

    if (action.type === "supporter") {
        return {
            result: supporterService.trigger(origin, target),
            action
        }
    }

    if (origin.type === "energy") {
        const { effect } = origin
        const energyResult = effectService[effect](origin, target)
        return {
            result: {
                ...energyResult,
            },
            action
        }
    }

    if (origin.type === "fighter") {
        const { skill } = action
        const attackResult = attackService[skill.effect](origin, target, skill)
        return {
            result: {
                ...attackResult,
            },
            action
        }
    }
}

const handleAction = (req, res) => {
    const { action, origin, target } = req.body
    _log("INPUT", req.body)
    const result = handle(action, origin, target)
    _log("OUTPUT", result)
    req.io.to(action.to).emit('actionReceived', result)
    res.json(result)
}

module.exports = {
    handleAction
}