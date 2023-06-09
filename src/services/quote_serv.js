import axios from 'axios'
const baseUrl = 'https://api.quotable.io/random'

const getQuote = async () => {
    const request = axios.get(baseUrl)
    const res = await request
    return res.data
}

export default {getQuote}