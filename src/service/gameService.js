
import {findCard} from './cardService'

const getRandom = (deck) => deck[Math.floor(Math.random() * deck.length)]

const generateKey = () => Math.random().toString(36).substr(2, 9)+'_'

export const findCardById = (id) =>{
    // const c = CARDS.find(card => card.id === id)
    // // console.log("CARD - ", c)
    // let card = JSON.parse(JSON.stringify(CARDS.find(card => card.id === id)))
    // // console.log("Stringed - ", card)
    // return {
    //     ...card,
    //     key:generateKey()
    // }
}

// TO DO quando tem varias cartas iguais na mão está removendo todas
export const removeFromHand = (id, hand) => JSON.parse(JSON.stringify(hand.filter(card => card.id !== id)))

export const drawHand = (deck) => {
    const hand = []
    for (let index = 0; index < 5; index++) {
        const card = getRandom(deck)
        hand.push(card)
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

const addEnergy = (value, key, fighter, reserve) => {
    if(fighter.key === key){
        return {
            
        }
    }
}

export const triggerAction = async (action, origin, target) => {
    const config = {
        method: 'POST',
        body:{action, origin, target}
    }
    let response = await fetch("/api/game/action", config);

    if (response.ok) {
        let json = await response.json();
        return json
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

