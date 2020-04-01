
import CARDS from '../data/CARDS'

export const findCardById = (id) => {
    return JSON.parse(JSON.stringify(CARDS.find(card => card.id === id)))
    // return CARDS.find(card => card.id === id)
}

