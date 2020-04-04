import axios from 'axios'

const BASE_URL = '/api'

export const get = (url) => {
    return axios.get(`${BASE_URL}${url}`)
}

export const post = async (url, body) => {
    const {data} = await axios.post(`${BASE_URL}${url}`, body)
    return data
}