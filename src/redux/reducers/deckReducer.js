import {getRandomCardsFromDeck} from '../../service/deckService'
// Action Types
export const Types = {
    SET_DECK: 'SET_DECK',
    DRAW_CARD: 'DRAW_CARD',
    REMOVE_CARD_FROM_HAND:'REMOVE_CARD_FROM_HAND'
}

// Reducer
const initialState = {
    deck: [],
    hand: []
    
}

export default function deckReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_DECK:
            return {
                ...state,
                deck: action.payload
            }
        case Types.DRAW_CARD:
            const data = getRandomCardsFromDeck(state.deck, action.payload)
            return {
                ...state,
                deck: data.deck,
                hand: [...state.hand, ...data.cards]
            }
        case Types.REMOVE_CARD_FROM_HAND:
            return {
                ...state,
                hand: state.hand.filter(e => e.key !== action.payload)
            }
        default:
            return state
    }
};

// Action Creators
export function setDeck(deck) {
    return {
        type: Types.SET_DECK,
        payload: deck
    }
}

export function drawCard(amount) {
    return {
        type: Types.DRAW_CARD,
        payload: amount
    }
}

export function removeCardFromHand(key) {
    return {
        type: Types.REMOVE_CARD_FROM_HAND,
        payload: key
    }
}
