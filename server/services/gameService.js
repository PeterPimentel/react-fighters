const effectService = require('./effectService')
const attackService = require('./attackService')

const _log = (level, {action, origin, target, result}) => {
    console.log(`${level}...`)
    console.log(`\n ${level} - action ${action.type}`)
    console.log(`\n ${level} - Origin ${JSON.stringify(origin)}`)
    console.log(`\n ${level} - target ${JSON.stringify(target)}`)
    console.log(`\n ${level} - RESULT ${JSON.stringify(result)}`)
    console.log("------------------------------")
}

const handle = (action, origin, target) => {
    switch (origin.type) {
        case 'energy':
            const {effect} = origin
            const energyResult = effectService[effect](origin, target)
            return {
                result:{
                    ...energyResult,
                },
                action
            }
        case 'fighter':
            const {skill} = action
            const attackResult = attackService[skill.effect](origin, target, skill)
            return {
                result:{
                    ...attackResult,
                },
                action
            }
        default:
            break;
    }
}

const handleAction = (req, res) => {
    const {action, origin, target} = req.body
    _log("INPUT",req.body)
    const result = handle(action, origin, target)
    _log("INPUT",result)
    req.io.to(action.to).emit('actionReceived',result)
    res.json(result)
}

module.exports = {
    handleAction
}