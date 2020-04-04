// Action Types
export const Types = {
    USER_READY: 'USER_READY',
    USER_SELECTED_FIGHTER: 'USER_SELECTED_FIGHTER'
};

// Reducer
const initialState = {
    username: `GUEST-${Math.floor(Math.random() * 1000)}`,
    fighter: {
        id:1
    },
    ready: false
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case Types.USER_READY:
            return {
                ...state,
                ready: action.payload
            }
        case Types.USER_SELECTED_FIGHTER:
            return {
                ...state,
                fighter: action.payload
            }
        default:
            return state
    }
};

// Action Creators
export function userReady(status) {
    return {
        type: Types.USER_READY,
        payload: status
    }
}

export function userSelectFighter(fighter) {
    return {
        type: Types.USER_SELECTED_FIGHTER,
        payload: fighter
    }
}
