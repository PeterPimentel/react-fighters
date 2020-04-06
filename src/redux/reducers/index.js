import { combineReducers } from 'redux'

import userReducer from './userReducer'
import opponentReducer from './opponentReducer'
import deckReducer from './deckReducer'
import gameReducer from './gameReducer'
import highlightReducer from './highlightReducer'

export default combineReducers({
    user: userReducer,
    opponent: opponentReducer,
    deck: deckReducer,
    game : gameReducer,
    highlight:highlightReducer
})
