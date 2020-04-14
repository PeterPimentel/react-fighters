// Action Types
export const Types = {
    OPPONENT_READY: 'OPPONENT_READY',
    OPPONENT_SELECTED_FIGHTER: 'OPPONENT_SELECTED_FIGHTER',
    OPPONENT_ADD_VICTORY: 'OPPONENT_ADD_VICTORY',
    SET_OPPONENT:'SET_OPPONENT'
}

// Reducer
const initialState = {
    username: "",
    fighter: {
        id:1
    },
    socketId:"",
    ready:false,
    victorys:0
}

export default function opponentReducer(state = initialState, action) {
    switch (action.type) {
        case Types.OPPONENT_READY:
            return {
                ...state,
                ready: action.payload
            }
        case Types.OPPONENT_SELECTED_FIGHTER:
            return {
                ...state,
                fighter: action.payload.fighter,
                username: action.payload.username,
                socketId: action.payload.socketId
            }
        case Types.OPPONENT_ADD_VICTORY:
            return {
                ...state,
                victorys: state.victorys + 1
            }
        case Types.SET_OPPONENT:
            return {
                ...state,
                username: action.payload.username,
                socketId: action.payload.socketId
            }
        default:
            return state
    }
}

// Action Creators
export function opponentReady(status) {
    return {
        type: Types.OPPONENT_READY,
        payload: status
    }
}

export function opponentSelectFighter(data) {
    return {
        type: Types.OPPONENT_SELECTED_FIGHTER,
        payload: data
    }
}

export function opponentAddVictory() {
    return {
        type: Types.OPPONENT_ADD_VICTORY
    }
}

export function setOpponent ({username, socketId}) {
    return {
        type: Types.SET_OPPONENT,
        payload: {username, socketId}
    }
}
