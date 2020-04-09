const { affectedTypes } = require('../contants')

const _transformTarget = (fighter) => {
    return [
        {
            affected: affectedTypes.FIGHTER,
            value: fighter
        }
    ]
}


const heal = (fighter, value) => {
    const healResult = fighter.map(effect => {
        if (effect.affected === affectedTypes.FIGHTER) {
            const damage = effect.value.damageReceived - value
            effect.value = {
                ...effect.value,
                damageReceived: damage < 0 ? 0 : damage
            }
            return effect
        } else {
            return effect
        }
    })

    return healResult
}

const addEnergy = (fighter, value) => {

    const energyResult = fighter.map(effect => {
        if (effect.affected === affectedTypes.FIGHTER) {
            const newEnergy = effect.value.energy + value
            effect.value = {
                ...effect.value,
                energy: newEnergy < 0 ? 0 : newEnergy
            }
            return effect
        } else {
            return effect
        }
    })

    return energyResult
}

const _effects = {
    heal,
    addEnergy
}


//Origin - Card dropped
//Target - Fighter
const trigger = (origin, target) => {
    let fighter = _transformTarget(target)

    origin.effects.forEach((effect, index) => {
        fighter = _effects[effect](fighter, origin.values[index])
    })

    const requiredAffected = [
        {
            affected: affectedTypes.HAND_REMOVE_ONE,
            value: origin.key
        },
        {
            affected: affectedTypes.TURN_SUPPORTER,
            value: true
        }
    ]

    return [...fighter, ...requiredAffected]
}

module.exports = {
    trigger
}
