// Action Types
export const Types = {
    OPPONENT_READY: 'OPPONENT_READY',
    OPPONENT_SELECTED_FIGHTER: 'OPPONENT_SELECTED_FIGHTER'
};

// Reducer
const initialState = {
    username: "",
    fighter: {
        id:1
    },
    ready:false
};

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
                username: action.payload.username
            }
        default:
            return state;
    }
};

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