import { combineReducers } from 'redux'

import userReducer from './userReducer'
import opponentReducer from './opponentReducer'
import deckReducer from './deckReducer'
import gameReducer from './gameReducer'

export default combineReducers({
    user: userReducer,
    opponent: opponentReducer,
    deck: deckReducer,
    game : gameReducer
})
