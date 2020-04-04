const _generateKey = () => Math.random().toString(36).substr(2, 9)

export const index = async () => {
    let response = await fetch("/api/deck");

    if (response.ok) {
        let json = await response.json();
        return json
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

export const getRandomCardsFromDeck = (deck, amount = 1) => {
    const cards = []
    for (let i = 0; i < amount; i++) {
        let card = deck[Math.floor(Math.random() * deck.length)]
        
        cards.push({...card,key:_generateKey() })

        const index = deck.map(el => el.id).indexOf()
        if(index > -1){
            deck.splice(index, 1)
        }
    }

    return { cards, deck }
}
