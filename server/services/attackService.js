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
    //Calc damage
    let damageResult = skill.damage + target.damageReceived || 0

    //Calc heal
    let healResult = origin.damageReceived - skill.value
    let newDamageResult = healResult < 0 ? 0 : healResult

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
                damageReceived: newDamageResult
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

const drainEnergy = (origin, target, skill) => {

    //Calc damage
    const damageResult = skill.damage + target.damageReceived || 0

    //Calc energy
    let originEnergy = origin.energy
    
    if(target.energy >= Math.abs(skill.value)){
        const energyResult = origin.energy + Math.abs(skill.value)
        originEnergy = energyResult <= 0 ? 0 : energyResult
    }

    //Calc opponent energy
    const oppEnergyResult = target.energy + skill.value
    let oppNewEnergy = oppEnergyResult < 0 ? 0 : oppEnergyResult

    return [
        {
            affected: affectedTypes.OPPONENT_FIGHTER,
            value: {
                ...target,
                damageReceived: damageResult,
                energy: oppNewEnergy
            }
        },
        {
            affected: affectedTypes.FIGHTER,
            value: {
                ...origin,
                energy: originEnergy
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
    charge: charge,
    drainEnergy: drainEnergy
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