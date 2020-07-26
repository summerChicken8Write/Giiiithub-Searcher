import axios from 'axios'

const TOKEN = '6e2d48427c94fc0e471c3f3ef54d3be31e0e3d90'
const BASE_URL = 'https://api.github.com/graphql'
const METHOD = 'post'

const AxiosRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    method: METHOD,
    headers: {
        Authorization: `token ${TOKEN}`,
    }
})

interface IParams {
    query: string
}

async function fetchData (params: IParams) {
    let response = await AxiosRequest.request({
        data: JSON.stringify(params)
    })
    
    return response
}

export default fetchData