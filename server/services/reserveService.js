const figtherFromReserve = (fighter, reserve) => {
    const newReserve = reserve.filter(fig => fig.key !== fighter.key)
    return [
        {
            affected: "fighter",
            value: fighter
        },
        {
            affected: "reserve",
            value: newReserve
        },
        {
            affected: "turnReserve",
            value: true //Já foi usado a vez de colocar um lutador na reserva
        },
        {
            affected: "turnArena",
            value: true //Lutador está sendo colocado agora
        }
    ]
}

const addFighter = (fighter, reserve) => {

    return [
        {
            affected: "reserve",
            value: reserve.concat(fighter)
        },
        {
            affected: "handRemoveOne",
            value: fighter.key
        },
        {
            affected: "turnReserve",
            value: true //Já foi usado a vez de colocar um lutador na reserva
        }
    ]
}

module.exports = {
    addFighter,
    figtherFromReserve
}