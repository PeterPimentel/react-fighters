
import CARDS from '../data/CARDS'

const getRandom = (ids) => ids[Math.floor(Math.random() * ids.length)]

const generateKey = () => Math.random().toString(36).substr(2, 9)

export const findCardById = (id) =>{
    const card = JSON.parse(JSON.stringify(CARDS.find(card => card.id === id)))
    return {
        ...card,
        key:generateKey()
    }
}

export const removeFromHand = (id, hand) => JSON.parse(JSON.stringify(hand.filter(card => card.id !== id)))

export const drawHand = (deck) => {
    const ids = Object.keys(deck)
    const hand = []
    for (let index = 0; index < 5; index++) {
        const id = getRandom(ids)
        hand.push(findCardById(Number(id)))
    }

    return hand
}

export const drawCard = (deck) => {
    const ids = Object.keys(deck)
    let valid = false
    let id
    
    while (valid === false) {
        id = getRandom(ids)
        if(deck[id] > 0 ){
            valid = true
        }
    }
    const card = findCardById(Number(id))
    const newDeck = {
        ...deck,
        [id]: deck[id] - 1
    }

    return {
        card : card,
        deck : newDeck
    }
}
