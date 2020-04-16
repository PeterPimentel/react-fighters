import { get } from './apiService'

export const index = async () => {
    return get("/fighter")
}

export const show = async (id) => {
    return get(`/api/fighter/${id}`)
}