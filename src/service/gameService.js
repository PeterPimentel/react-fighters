import {post} from './apiService'

export const triggerAction = async (action, origin, target) => {
    return post('/game/action',{action, origin, target})
}

