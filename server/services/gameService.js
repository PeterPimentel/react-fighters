const effectService = require('./effectService')
const attackService = require('./attackService')

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
    console.log(req.body)
    const result = handle(action, origin, target)
    req.io.to(action.to).emit('actionReceived',result)
    res.json(result)
}

module.exports = {
    handleAction
}