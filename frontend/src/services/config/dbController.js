import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getArticlesFromDB = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/articles`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getOrdersFromDB = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const deleteOrderFromDB = async (orderId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  };
