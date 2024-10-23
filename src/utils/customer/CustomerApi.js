import { apiClient } from "../api/api"





export const getCustomer =()=>{
    return apiClient.get('customers')
}

export const createCustomer = (data) =>{
    return apiClient.post('customers/', data)
}