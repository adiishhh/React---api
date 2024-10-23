import { useMutation } from "@tanstack/react-query"
import { createCustomer } from "./CustomerApi"

export const useCreateCustomer = () =>{
    return useMutation({
        mutationFn:createCustomer
    })
}