import { apiClient } from "../api/api"

export const getAccounts =() =>{
    return apiClient.get('apiaccounts')
}
export const deleteAccounts =(id)=>{
    return apiClient.delete(`deleteDataAccounts/${id}/`)
}