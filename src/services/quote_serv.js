import axios from 'axios'
const baseUrl = 'https://api.quotable.io/random'

const getQuote = () => {
    const request = axios.get(baseUrl)
    return request.then(res => Object.values(res.data))
}

export default {getQuote}