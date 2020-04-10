const { affectedTypes } = require('../contants')

const _checkFighterDamage = (affectedArray) => {
    const fighter = affectedArray.find(el => el.affected === affectedTypes.OPPONENT_FIGHTER)

    if (fighter) {
        if (fighter.value.life <= fighter.value.damageReceived) {

            affectedArray.push(
                { affected: affectedTypes.KO },
                { affected: affectedTypes.TURN_ARENA, value: true }//Arena Empty = true
            )
        }
    }
    return affectedArray
}

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

const _skillTypes = {
    regular: regular,
    discardEnergy: discardEnergy,
    flipCoin: flipCoin,
    heal: heal
}


const triggerAttack = (origin, target, skill) => {
    const result = _skillTypes[skill.effect](origin, target, skill)
    return _checkFighterDamage(result)
}

//collect draw a card
//hurt - take damage

module.exports = {
    triggerAttack
}