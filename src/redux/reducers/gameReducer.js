import { triggerAction } from '../../service/gameService'
import { removeCardFromHand, drawCard } from './deckReducer'

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
    equipment: false,
    reserve: false
}

const mockRe = [
    {
        "id": 1,
        "name": "Joe Higashi",
        "image": "http://localhost:8080/static/fighters/joe_card.png",
        "avatar": "http://localhost:8080/static/fighters/joe_avatar.png"
    },
    {
        "id": 2,
        "name": "Balrog",
        "image": "http://localhost:8080/static/fighters/balrog_card.png",
        "avatar": "http://localhost:8080/static/fighters/balrog_avatar.png"
    }
]

// Reducer
const initialState = {
    fighter: { skills: [] },
    reserve: [],
    opponentFighter: {
        skills: []
    },
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
            console.log("Aqui")
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
    return async dispatch => {
        try {
            const data = await triggerAction(action, origin, target)
            if (target.type === 'fighter') {
                dispatch(setFighter(data.result))
                dispatch(removeCardFromHand(origin.key))
                if (origin.type === 'energy') {
                    dispatch(setTurn({ energy: true }))
                }
            }
        } catch (err) {
            console.log("ERRO - ", err)
        }
    }
}

//Ações executadas ao dropar cards na reserva
export function handleReseverAction(action, origin, target) {
    return async dispatch => {
        try {
            const data = await triggerAction(action, origin, target)
            if (action.action === "addFighter") {
                dispatch(setReserve(data.result))
                dispatch(removeCardFromHand(origin.key))
                dispatch(setTurn({ reserve: true }))
            }
        } catch (err) {
            console.log("ERRO - ", err)
        }
    }
}

//Ações executadas pelo lutador
export function handleUserAction(action, origin, target) {
    return async dispatch => {
        try {
            const data = await triggerAction(action, origin, target)
            if (origin.type === 'fighter') {
                dispatch(setFighter(data.result.origin))

            }
            if (target.type === 'fighter') {
                dispatch(setOpponentFighter(data.result.target))
                dispatch(setTurn(_turnInitalState))
            }
        } catch (err) {
            console.log("ERRO - ", err)
        }
    }
}


//Ações executadas pelo opponent que chegara via socket
export function handleOpponentAction(data) {
    return async dispatch => {
        switch (data.action.type) {
            case 'reserve':
                dispatch(setOpponentReserve(data.result))
                break
            case 'energy':
                dispatch(setOpponentFighter(data.result))
                break
            case 'attack':
                dispatch(setOpponentFighter(data.result.origin))
                dispatch(setFighter(data.result.target))
                dispatch(setTurn({ ..._turnInitalState, my: true }))
                dispatch(drawCard(1))
                break
            case 'skip':
                console.log("Aqui")
                dispatch(setTurn({ ..._turnInitalState, my: true }))
                dispatch(drawCard(1))
                break
            default:
                break;
        }
    }
}