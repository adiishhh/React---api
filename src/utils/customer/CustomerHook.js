import { useMutation } from "@tanstack/react-query"
import { createCustomer, deleteCustomer, updateCustomer } from "./CustomerApi"

export const useCreateCustomer = () =>{
    return useMutation({
        mutationFn:createCustomer
    })
}
export const useDeleteCustomer = () =>{
    return useMutation({
        mutationFn:deleteCustomer
    })
}

export const useUpdateCustomer = () => {
    return useMutation({
        mutationFn: ({ data, id }) => updateCustomer(data, id), // Destructure the parameters
    });
};
