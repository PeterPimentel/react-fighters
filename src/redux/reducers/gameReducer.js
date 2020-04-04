import {triggerAction} from '../../service/gameService'
import { removeCardFromHand } from './deckReducer'

// Action Types
export const Types = {
    SET_FIGHTER: 'SET_FIGHTER',
    SET_RESERVE: 'SET_RESERVE',
    SET_ENERGY_FIGHTER:'SET_ENERGY_FIGHTER',
    SET_OPP_FIGHTER: 'SET_OPP_FIGHTER',
    SET_OPP_RESERVE: 'SET_OPP_RESERVE',
    SET_OPP_ENERGY_FIGHTER: 'SET_OPP_ENERGY_FIGHTER'

}

// Reducer
const initialState = {
    fighter: {},
    reserve:[],
    opponentFighter:{},
    opponentReserve:[]
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

export function addEnergy(value, key){
    return {
        type: Types.SET_ENERGY_FIGHTER,
        payload: value
    }
}

export function handleDrop(action, origin, target) {
    return async dispatch => {
        try {
            const data = await triggerAction(action, origin, target)
            if(target.type === 'fighter'){
                dispatch(setFighter(data.result))
                dispatch(removeCardFromHand(origin.key))
            }
        } catch (err) {
            console.log("ERRO - ", err)
        }
    }
}

export function handleUserAction(action, origin, target) {
    return async dispatch => {
        try {
            const data = await triggerAction(action, origin, target)
            if(origin.type === 'fighter'){
                dispatch(setFighter(data.result.origin))

            }
            if(target.type === 'fighter'){
                dispatch(setOpponentFighter(data.result.target))
            }
        } catch (err) {
            console.log("ERRO - ", err)
        }
    }
}