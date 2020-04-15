const affectedTypes = {
    FIGHTER: 'fighter',
    OPPONENT_FIGHTER: 'opponentFighter',
    HAND_REMOVE_ONE: 'handRemoveOne',
    TURN_ENERGY: 'turnEnergy',
    TURN_ARENA: 'turnArena',
    TURN_RESERVE: 'turnReserve',
    TURN_SUPPORTER: 'turnSupporter',
    TURN_END: 'endTurn',
    RESERVE: 'reserve',
    KO: 'KO',
    USER_ADD_VICTORY: 'userAddVictory'
}

const actionstypes = {
    SKIP: 'skip',
    FIGHTER_FROM_RESERVE: 'figtherFromReserve',
    ATTACK: 'attack',
    RESERVE: 'reserve',
    SUPPORTER: 'supporter',
    ENERGY: 'energy'
}

module.exports = {
    affectedTypes,
    actionstypes
}