import { apiClient } from "../api/api"

export const getSaleItems =() =>{
    return apiClient.get('saleItems')
}
