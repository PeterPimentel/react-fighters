const affectedTypes = {
    FIGHTER: 'fighter',
    OPPONENT_FIGHTER: 'opponentFighter',
    HAND_REMOVE_ONE: 'handRemoveOne',
    DECK_DRAW: 'deckDraw',
    TURN_ENERGY: 'turnEnergy',
    TURN_ARENA: 'turnArena',
    TURN_RESERVE: 'turnReserve',
    TURN_SUPPORTER: 'turnSupporter',
    TURN_END: 'endTurn',
    RESERVE: 'reserve',
    KO: 'KO',
    TIED_ROUND: 'TIED_ROUND',
    SELF_KO:'SELF_KO',
    USER_ADD_VICTORY: 'userAddVictory'
}

const actionstypes = {
    SKIP: 'skip',
    FIGHTER_FROM_RESERVE: 'fighterFromReserve',
    ATTACK: 'attack',
    RESERVE: 'reserve',
    SUPPORTER: 'supporter',
    ENERGY: 'energy'
}

module.exports = {
    affectedTypes,
    actionstypes
}