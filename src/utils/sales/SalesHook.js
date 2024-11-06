import { useMutation } from "@tanstack/react-query";
import { createSales, deleteSales, updateSales } from "./SalesApi";

export const useCreateSales = () => {
    return useMutation(createSales);
};

export const useUpdateSales = () => {
    return useMutation(({ data, id }) => updateSales(data, id));
};

export const useDeleteSales = () => {
    return useMutation(deleteSales);
};