
import CARDS from '../data/CARDS'

export const findCardById = (id) => JSON.parse(JSON.stringify(CARDS.find(card => card.id === id)))

export const removeFromHand = (id, hand) => JSON.parse(JSON.stringify(hand.filter(card => card.id !== id)))

