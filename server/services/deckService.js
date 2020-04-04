const cardService = require('./cardService')

const DECK = require("../data/deck.json")

const _findAll = () => DECK

const _shuffle = (deck) => deck.sort(() => Math.random() - 0.5)

const index = (req, res) => {
    const deck = []
    const data = _findAll()
    const keys = Object.keys(data)

    keys.forEach(key => {
        const card = cardService._find(key)
        for(let i=0; i < data[key]; i++){
            deck.push(card[0])
        }
    })
    
    res.json(_shuffle(deck))
}

module.exports = {
    index
}