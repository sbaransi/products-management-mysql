import axios from "axios";

const API_URL = "http://localhost:5001/api/products";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (productData: any) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
