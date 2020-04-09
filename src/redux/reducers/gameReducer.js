import { triggerAction } from '../../service/gameService'
import { show } from '../../service/cardService'
import { removeCardFromHand, drawCard } from './deckReducer'
import { setPlayed, hidePlayed } from './highlightReducer'

// Action Types
export const Types = {
    SET_FIGHTER: 'SET_FIGHTER',
    SET_RESERVE: 'SET_RESERVE',
    SET_ENERGY_FIGHTER: 'SET_ENERGY_FIGHTER',
    SET_OPP_FIGHTER: 'SET_OPP_FIGHTER',
    SET_OPP_RESERVE: 'SET_OPP_RESERVE',
    SET_OPP_ENERGY_FIGHTER: 'SET_OPP_ENERGY_FIGHTER',
    SET_TURN: 'SET_TURN',
    UPDATE_RESERVE: 'UPDATE_RESERVE',
    UPDATE_OPP_RESERVE: 'UPDATE_OPP_RESERVE',
}

const _turnInitalState = {
    my: false,
    energy: false,
    attack: false,
    supporter: false,
    reserve: false,
    arena: true
}

// Reducer
const initialState = {
    fighter: { skills: [] },
    reserve: [],
    opponentFighter: { skills: [] },
    opponentReserve: [],
    turn: _turnInitalState
}

export default function gameReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_FIGHTER:
            return {
                ...state,
                fighter: {
                    ...action.payload,
                    energy: action.payload.energy || 0,
                    damageReceived: action.payload.damageReceived || 0
                }
            }
        case Types.SET_OPP_FIGHTER:
            return {
                ...state,
                opponentFighter: {
                    ...action.payload,
                    energy: action.payload.energy || 0,
                    damageReceived: action.payload.damageReceived || 0
                }
            }
        case Types.SET_RESERVE:
            return {
                ...state,
                reserve: action.payload
            }
        case Types.SET_OPP_RESERVE:
            return {
                ...state,
                opponentReserve: action.payload
            }
        case Types.SET_ENERGY_FIGHTER:
            return {
                ...state,
                opponentReserve: action.payload
            }
        case Types.SET_TURN:
            return {
                ...state,
                turn: {
                    ...state.turn,
                    ...action.payload
                }
            }
        default:
            return state
    }
}

// Action Creators
export function setFighter(fighter) {
    return {
        type: Types.SET_FIGHTER,
        payload: fighter
    }
}

export function setOpponentFighter(fighter) {
    return {
        type: Types.SET_OPP_FIGHTER,
        payload: fighter
    }
}

export function addEnergy(value, key) {
    return {
        type: Types.SET_ENERGY_FIGHTER,
        payload: value
    }
}

export function setTurn(value) {
    return {
        type: Types.SET_TURN,
        payload: value
    }
}


export function setReserve(reserve) {
    return {
        type: Types.SET_RESERVE,
        payload: reserve
    }
}

export function setOpponentReserve(reserve) {
    return {
        type: Types.SET_OPP_RESERVE,
        payload: reserve
    }
}

function _myActionsUpdate(dispatch, data) {
    data.result.forEach(el => {
        if (el.affected === "reserve") {
            dispatch(setReserve(el.value))
        }
        if (el.affected === "fighter") {
            dispatch(setFighter(el.value))
        }
        if (el.affected === "turnEnergy") {
            dispatch(setTurn({ energy: el.value }))
        }
        if (el.affected === "turnReserve") {
            dispatch(setTurn({ reserve: el.value }))
        }
        if (el.affected === "turnArena") {
            dispatch(setTurn({ arena: el.value }))
        }
        if (el.affected === "opponentFighter") {
            dispatch(setOpponentFighter(el.value))
            if (el.value.damageReceived >= el.value.life) {
                setTimeout(() => dispatch(setOpponentFighter({})), 500)
            }
        }
        if (el.affected === "handRemoveOne") {
            dispatch(removeCardFromHand(el.value))
        }

        //Always the latest action
        if (el.affected === "endTurn") {
            dispatch(setTurn(_turnInitalState))
        }
    })
}

export function skipTurn(action) {
    return async dispatch => {
        try {
            await triggerAction(action)
            dispatch({
                type: Types.SET_TURN,
                payload: _turnInitalState
            })
        } catch (error) {
            console.log("ERR - ", error)
        }
    }
}


//Ações executadas ao dropar cards no lutador
export function handleDrop(action, origin, target) {
    return async (dispatch, getState) => {
        const { turn } = getState().game
        if (turn.my === true) {
            if (
                (action.type === 'energy' && turn.energy === false) ||
                (action.type === 'supporter' && turn.supporter === false) ||
                (action.type === 'figtherFromReserve' && turn.arena === false) ||
                (action.type === 'reserve' && turn.reserve === false) ||
                (action.type === 'attack')
            ) {
                try {
                    const data = await triggerAction(action, origin, target)
                    _myActionsUpdate(dispatch, data)

                } catch (err) {
                    console.log("ERRO - ", err)
                }
            }
        }
    }
}


//Ações executadas pelo opponent que chegara via socket
export function handleOpponentAction(data) {
    return async dispatch => {
        let cardPlayed

        if (data.origin) {
            cardPlayed = await show(data.origin.id)
            dispatch(setPlayed(cardPlayed))
        }

        const _opponentActionsUpdate = (dispatch, data) => () => {
            data.result.forEach(el => {
                if (el.affected === "reserve") {
                    dispatch(setOpponentReserve(el.value))
                }
                if (el.affected === "fighter") {
                    dispatch(setOpponentFighter(el.value))
                }
                if (el.affected === "opponentFighter") {
                    dispatch(setFighter(el.value))
                    if (el.value.damageReceived >= el.value.life) {
                        setTimeout(() => dispatch(setFighter({})), 500)
                    }
                }
                if (el.affected === "endTurn") {
                    dispatch(setTurn({ ..._turnInitalState, my: true }))
                    dispatch(drawCard(1))
                }
            })
            dispatch(hidePlayed())
        }

        setTimeout(_opponentActionsUpdate(dispatch, data), 1800)
    }
}