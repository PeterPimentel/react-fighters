const effectService = require('./effectService')

const handle = (action, origin, target) => {
    switch (origin.type) {
        case 'energy':
            const {effect} = origin
            const result = effectService[effect](origin, target)
            return {
                ...result,
                action
            }
        default:
            break;
    }
}



const handleAction = (req, res) => {
    console.log("REQQ", req.body)
    const {action, origin, target} = req.body
    const result = handle(action, origin, target)

    req.json(result)
}

module.exports = {
    handleAction
}