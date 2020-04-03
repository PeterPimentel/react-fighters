import CardFactory from '../models/CardFactory'

import CARDS from '../data/CARDS'

export const findCard = (id) =>{
    const card = CARDS.find(card => card.id === id)
    return CardFactory(card)
    // console.log("CARD - ", c)
    // let card = JSON.parse(JSON.stringify(CARDS.find(card => card.id === id)))
    // console.log("Stringed - ", card)
    // return {
    //     ...card,
    //     key:generateKey()
    // }
}
