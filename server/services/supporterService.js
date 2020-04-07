const heal = (fighter, value) => {
    let damage = fighter.damageReceived - value
    return {
        ...fighter,
        damageReceived: damage < 0 ? 0 : damage
    }
}

const addEnergy = (fighter, value) => {
    const newEnergy = fighter.energy + value

    return {
        ...fighter,
        energy: newEnergy < 0 ? 0 : newEnergy
    }
}

const _effects = {
    heal,
    addEnergy
}


//Origin - Card dropped
//Target - Fighter
const trigger = (origin, target) => {

    origin.effects.forEach((effect, index) => {
        target = _effects[effect](target, origin.values[index])
    })

    return target
}

module.exports = {
    trigger
}