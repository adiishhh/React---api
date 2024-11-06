import { useMutation } from "@tanstack/react-query"
import { createStock, deleteStock, updateStock } from "./StockApi"

export const useCreateStock = () =>{
    return useMutation({
        mutationFn:createStock
    })
}
export const useUpdateStock = () =>{
    return useMutation({
        mutationFn:({data,id}) => updateStock(data,id)
    })
}
export const useDeleteStock = () =>{
    return useMutation({
        mutationFn:deleteStock
    })
}