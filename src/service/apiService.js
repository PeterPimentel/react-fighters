import axios from 'axios'

const BASE_URL = '/api'

export const get = async (url) => {
    const {data} = await axios.get(`${BASE_URL}${url}`)
    return data
}

export const post = async (url, body) => {
    const {data} = await axios.post(`${BASE_URL}${url}`, body)
    return data
}