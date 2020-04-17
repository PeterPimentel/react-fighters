import {post} from './apiService'

export const triggerAction = async (action, origin, target) => {
    return post('/game/action',{action, origin, target})
}


export const validateTurnRules = (turn, action, target) => {
    const result = {
        valid:false,
        message:""
    }

    if(turn.my === false){
        result.message = "Wait for your turn to do this!"

    }else if(action.type === 'energy' && turn.energy === true){
        result.message = "You only could play one energy card by turn."

    }else if(action.type === 'supporter' && turn.supporter === true){
        result.message = "You only could play one support card by turn."

    }else if((action.type === 'supporter' || action.type === 'energy') && !target.id){
        result.message = "You only could play a support card having a fighter on arena."

    }else if(action.type === 'figtherFromReserve' && turn.arenaEmpty === false){
        result.message = "The arena must by empty to put a new fighter there."

    }else if(action.type === 'reserve' && turn.reserve === true){
        result.message = "You only could play one fighter card on reserve by turn."

    }else if (action.type === 'attack'){
        result.valid = true
        result.message = ""
    }else{
        result.valid = true
    }

    return result
}
