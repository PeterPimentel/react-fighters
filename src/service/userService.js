import {get} from './apiService'

export const index = async () => {
    const {data}  = await get('/user')
    return data
}
