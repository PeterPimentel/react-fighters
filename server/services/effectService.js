const { affectedTypes } = require('../contants')

const addEnergy = (origin, target) => {
    const newEnergy = target.energy + origin.value

    return [
        {
            affected: affectedTypes.FIGHTER,
            value: {
                ...target,
                energy: newEnergy < 0 ? 0 : newEnergy
            }
        },
        {
            affected: affectedTypes.HAND_REMOVE_ONE,
            value: origin.key
        },
        {
            affected: affectedTypes.TURN_ENERGY,
            value: true
        }
    ]
}

module.exports = {
    addEnergy
}