// Action Types
export const Types = {
    SET_PLAYED_CARD: 'SET_PLAYED_CARD',
    HIDE_PLAYED_CARD: 'HIDE_PLAYED_CARD',
}

// Reducer
const initialState = {
    playedCard: {},
    showPlayed: false,
    playedClass: ""
}

export default function highlightReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_PLAYED_CARD:
            return {
                ...state,
                playedCard: action.payload,
                showPlayed: true,
                playedClass: "slideInFwdTop"
            }
        case Types.HIDE_PLAYED_CARD:
            return {
                ...state,
                showPlayed: false,
                playedClass: "scaleOutCenter"
            }
        default:
            return state
    }
};

// Action Creators
export function setPlayed(card) {
    return {
        type: Types.SET_PLAYED_CARD,
        payload: card
    }
}

export function hidePlayed() {
    return {
        type: Types.HIDE_PLAYED_CARD
    }
}
