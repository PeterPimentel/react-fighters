import Joe from './Joe'
import Fighter from './Fighter'

export default function getFighter(card){
    if(card.factory === "joe"){
        return new Joe(card.id, card.name, card.image, card.life, card.factory, card.skills)
    }

    if(card.factory === "deafult"){
        return new Fighter(card.id, card.name, card.image, card.life, card.factory, card.skills)
    }
}
