const { affectedTypes } = require('../contants')

const flipCoin = (origin, target, skill) => {
    let damageReceived = target.damageReceived || 0
    if (Math.random() > 0.5) {
        damageReceived = skill.damage + damageReceived
    }

    return [
        {
            affected: affectedTypes.OPPONENT_FIGHTER,
            value: {
                ...target,
                damageReceived: damageReceived
            }
        },
        {
            affected: affectedTypes.TURN_END
        }
    ]

}
const discardEnergy = (origin, target, skill) => {
    let damageReceived = target.damageReceived || 0

    damageReceived = skill.damage + damageReceived
    let newEnergy = origin.energy - skill.value < 0 ? 0 : origin.energy - skill.value
    return [
        {
            affected: affectedTypes.OPPONENT_FIGHTER,
            value: {
                ...target,
                damageReceived: damageReceived
            }
        },
        {
            affected: affectedTypes.FIGHTER,
            value: {
                ...origin,
                energy: newEnergy
            }
        },
        {
            affected: affectedTypes.TURN_END
        }
    ]

}

const regular = (origin, target, skill) => {
    let damageReceived = target.damageReceived || 0
    damageReceived = skill.damage + damageReceived

    return [
        {
            affected: affectedTypes.OPPONENT_FIGHTER,
            value: {
                ...target,
                damageReceived: damageReceived
            }
        },
        {
            affected: affectedTypes.TURN_END
        }
    ]
}

const heal = (origin, target, skill) => {
    let damage = target.damageReceived || 0
    let damageReceived = damage - skill.damage

    damageReceived = damageReceived < 0 ? 0 : damage

    return [
        {
            affected: affectedTypes.FIGHTER,
            value: {
                ...origin,
                damageReceived: damageReceived
            }
        },
        {
            affected: affectedTypes.TURN_END
        }
    ]
}

//collect draw a card
//hurt - take damage

module.exports = {
    regular,
    discardEnergy,
    flipCoin,
    heal
}