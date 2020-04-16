import {get} from './apiService'

export const index = async () => {
    return  await get('/user')
}
