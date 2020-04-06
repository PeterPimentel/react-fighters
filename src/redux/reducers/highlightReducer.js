// Action Types
export const Types = {
    SET_HIGHLIGHTED: 'SET_HIGHLIGHTED',
    HIDE_HIGHLIGHTED:'HIDE_HIGHLIGHTED'
}

// Reducer
const initialState = {
    position: 0,
    highlighted: {}
}

export default function highlightReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_HIGHLIGHTED:
            return {
                ...state,
                highlighted: action.payload.card,
                position: action.payload.position
            }
        case Types.HIDE_HIGHLIGHTED:            
            return {
                ...state,
                position: 0
            }
        default:
            return state
    }
};

// Action Creators
export function setHighlight(card, mouse, screen) {
    let position = 0
    
    if (mouse + 200 > screen) {
        position = screen - 200
    } else {
        position = mouse - 16
    }

    return {
        type: Types.SET_HIGHLIGHTED,
        payload: {
            card,
            position
        }
    }
}

export function hideHighlighted(){
    return {
        type: Types.HIDE_HIGHLIGHTED
    }
}
