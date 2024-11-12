import { useMutation } from "@tanstack/react-query"
import { createExpense, deleteExpense, updateExpense } from "./ExpenseApi"

export const useCreateExpense = () =>{
    return useMutation({
        mutationFn:createExpense
    })
}
export const useUpdateExpense = () =>{
    return useMutation({
        mutationFn:({data,id}) => updateExpense(data,id)
    })
}
export const useDeleteExpense = () =>{
    return useMutation({
        mutationFn:deleteExpense
    })
}