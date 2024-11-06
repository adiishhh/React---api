import { apiClient } from "../api/api";

export const getSales = async () => {
    const response = await apiClient.get('sales/');
    return response.data; // Return the data directly
};

export const createSales = async (data) => {
    const response = await apiClient.post('sales/', data);
    console.log("API Response:", response); // Log the response
    return response.data; // Return the created sale data
};

export const updateSales = (data, id) => {
    return apiClient.put(`sales/${id}/`, data);
};

export const deleteSales = (id) => {
    return apiClient.delete(`sales/${id}/`);
};