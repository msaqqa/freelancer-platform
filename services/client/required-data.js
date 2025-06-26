import { apiTaqat } from '../api';

// Save required data for the client
export const saveClientRequiredData = async (data) => {
  try {
    const response = await apiTaqat.post('/client/save-data', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
