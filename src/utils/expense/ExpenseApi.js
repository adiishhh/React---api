import { apiClient } from "../api/api"

export const getExpense =()=>{
    return apiClient.get('expenses')
}
export const createExpense =(data)=>{
    return apiClient.post('expenses/', data)
}
export const updateExpense =(data, id)=>{
    return apiClient.put(`expenses/${id}/`,data)
}
export const deleteExpense =(id)=>{
    return apiClient.delete(`deleteExpenses/${id}/`)
}