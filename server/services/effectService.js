const flipCoin = (times) => {
    
}

const regular = (origin, target, skill) => {
    let damageReceived = target.damageReceived || 0
    damageReceived= skill.damage + damageReceived
    return {
        target:{
            ...target,
            damageReceived: damageReceived
        },
        origin
    }
}

const addEnergy = (origin, target) => {
    const newEnergy = target.energy + origin.value

    return {
        ...target,
        energy: newEnergy < 0 ? 0 : newEnergy
    }
}

module.exports = {
    flipCoin,
    addEnergy,
    regular
}