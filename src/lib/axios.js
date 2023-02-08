import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Max-Age': 86400,
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,DELETE,UPDATE, PATCH',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    credentials: 'same-origin'
})

export default axios
