const { affectedTypes } = require('../contants')

const figtherFromReserve = (fighter, reserve) => {
    const newReserve = reserve.filter(fig => fig.key !== fighter.key)
    return [
        {
            affected: affectedTypes.FIGHTER,
            value: fighter
        },
        {
            affected: affectedTypes.RESERVE,
            value: newReserve
        },
        {
            affected: affectedTypes.TURN_RESERVE,
            value: true //Já foi usado a vez de colocar um lutador na reserva
        },
        {
            affected: affectedTypes.TURN_ARENA,
            value: false //Lutador está sendo colocado agora
        }
    ]
}

const addFighter = (fighter, reserve) => {

    return [
        {
            affected: affectedTypes.RESERVE,
            value: reserve.concat(fighter)
        },
        {
            affected: affectedTypes.HAND_REMOVE_ONE,
            value: fighter.key
        },
        {
            affected: affectedTypes.TURN_RESERVE,
            value: true //Já foi usado a vez de colocar um lutador na reserva
        }
    ]
}

module.exports = {
    addFighter,
    figtherFromReserve
}