const addEnergy = (origin, target) => {
    const newEnergy = target.energy + origin.value

    return [
        {
            affected: "fighter",
            value: {
                ...target,
                energy: newEnergy < 0 ? 0 : newEnergy
            }
        },
        {
            affected: "handRemoveOne",
            value: origin.key
        },
        {
            affected: "turnEnergy",
            value: true
        }
    ]
}

module.exports = {
    addEnergy
}