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

const charge = (origin, target, skill) => {
    let damageReceived = target.damageReceived || 0
    const damage = origin.energy * skill.value

    return [
        {
            affected: affectedTypes.OPPONENT_FIGHTER,
            value: {
                ...target,
                damageReceived: damage + damageReceived
            }
        },
        {
            affected: affectedTypes.TURN_END
        }
    ]
}

const heal = (origin, target, skill) => {
    let damage = target.damageReceived || 0
    let damageReceived = damage - skill.value

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

const addEnergy = (origin, target, skill) => {

    //Calc damage
    let damageResult = skill.damage + target.damageReceived || 0

    //Calc energy
    let energyResult = origin.energy + skill.value
    let newEnergy = energyResult < 0 ? 0 : energyResult

    return [
        {
            affected: affectedTypes.OPPONENT_FIGHTER,
            value: {
                ...target,
                damageReceived: damageResult
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

const _skillTypes = {
    regular: regular,
    flipCoin: flipCoin,
    heal: heal,
    addEnergy: addEnergy,
    charge: charge
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