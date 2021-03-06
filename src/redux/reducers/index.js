import { combineReducers } from 'redux'

import userReducer from './userReducer'
import opponentReducer from './opponentReducer'
import deckReducer from './deckReducer'
import gameReducer from './gameReducer'
import highlightReducer from './highlightReducer'
import animationReducer from './animationReducer'

export default combineReducers({
    user: userReducer,
    opponent: opponentReducer,
    deck: deckReducer,
    game : gameReducer,
    highlight:highlightReducer,
    animation: animationReducer
})
