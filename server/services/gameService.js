const effectService = require('./effectService')

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
            const attackResult = effectService[skill.effect](origin, target, skill)
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
    res.json(result)
}

module.exports = {
    handleAction
}