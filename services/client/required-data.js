import { apiTaqat } from '../api';

// Save required data for the client
export const saveClientRequiredData = async (data) => {
  const response = await apiTaqat.post('/client/save-data', data);
  return response.data;
};
