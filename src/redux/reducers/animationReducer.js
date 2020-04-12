// Action Types
export const Types = {
    SET_ARENA_TITLE: 'SET_ARENA_TITLE',
    SET_ARENA_SOUND: 'SET_ARENA_SOUND',
    SET_USER_FIGHTER_ANI: 'SET_USER_FIGHTER_ANI',
    SET_OPPONENT_FIGHTER_ANI: 'SET_OPPONENT_FIGHTER_ANI'
}

// Reducer
const initialState = {
    title: {
        show:false,
        message:"",
        animation:""
    },
    userAnimation:{
        name:""
    },
    opponentAnimation:{
        name:""
    }
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_ARENA_TITLE:
            return {
                ...state,
                title:{
                    ...state.title,
                    ...action.payload
                }
            }
        case Types.SET_USER_FIGHTER_ANI:
            return {
                ...state,
                userAnimation:{
                    name:action.payload
                }
            }
        case Types.SET_OPPONENT_FIGHTER_ANI:
            return {
                ...state,
                opponentAnimation:{
                    name:action.payload
                }
            }
        default:
            return state
    }
};

// Action Creators
export function setArenaTitle(data) {
    return {
        type: Types.SET_ARENA_TITLE,
        payload: data
    }
}

export function hideArenaTitle() {
    return {
        type: Types.SET_ARENA_TITLE,
        payload: {
            show:false,
            message:""
        }
    }
}

export function setUserAnimation(name) {
    return {
        type: Types.SET_USER_FIGHTER_ANI,
        payload: name
    }
}

export function setOpponentAnimation(name) {
    return {
        type: Types.SET_OPPONENT_FIGHTER_ANI,
        payload: name
    }
}
