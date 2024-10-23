import axios from 'axios'

const baseUrl = 'http://localhost:8000/'


export const apiClient = axios.create({
        baseURL:baseUrl,
        headers:{
            'Content-Type':'application/json',
            Accept:'application/json'
        }
    })


