
const discardEnergy = (origin, target, skill) => {
    let damageReceived = target.damageReceived || 0
    damageReceived= skill.damage + damageReceived

    return {
        target:{
            ...target,
            damageReceived: damageReceived
        },
        origin : {
            ...origin,
            energy:origin.energy - skill.value
        }
    }

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

module.exports = {
    regular,
    discardEnergy
}