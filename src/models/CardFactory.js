import FighterFactory from './FighterFactory'

export default function getCard(card) {

    if(card.type === 'fighter'){
        const fighter = FighterFactory(card) 
        console.log("Lutador ", fighter)
        return fighter
    }
    
    return {
		"id":5,
		"name":"Punch Energy",
		"image":"https://i.pinimg.com/236x/f2/97/af/f297af1da7041035736a13782bd7b596.jpg",
		"type":"energy"
	}
    
}