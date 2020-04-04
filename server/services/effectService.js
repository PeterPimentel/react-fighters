const flipCoin = (times) => {
    
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
    addEnergy
}