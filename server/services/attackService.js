
const flipCoin = (origin, target, skill) => {
    let damageReceived = target.damageReceived || 0
    if(Math.random() > 0.5){
        damageReceived = skill.damage + damageReceived
    }

    return [
        {
            affected: "opponentFighter",
            value: {
                ...target,
                damageReceived: damageReceived
            }
        },
        {
            affected: "endTurn"
        }
    ]

}
const discardEnergy = (origin, target, skill) => {
    let damageReceived = target.damageReceived || 0

    damageReceived = skill.damage + damageReceived
    let newEnergy = origin.energy - skill.value < 0 ? 0 : origin.energy - skill.value
    return [
        {
            affected: "opponentFighter",
            value: {
                ...target,
                damageReceived: damageReceived
            }
        },
        {
            affected: "fighter",
            value: {
                ...origin,
                energy: newEnergy
            }
        },
        {
            affected: "endTurn"
        }
    ]

}

const regular = (origin, target, skill) => {
    let damageReceived = target.damageReceived || 0
    damageReceived = skill.damage + damageReceived

    return [
        {
            affected: "opponentFighter",
            value: {
                ...target,
                damageReceived: damageReceived
            }
        },
        {
            affected: "endTurn"
        }
    ]
}

module.exports = {
    regular,
    discardEnergy,
    flipCoin
}