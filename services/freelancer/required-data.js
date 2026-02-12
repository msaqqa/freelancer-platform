import { apiTaqat } from '../api';

// add required data for freelancer user
export const addRequiredDataFreelancer = async (data) => {
  const response = await apiTaqat.post('/freelancer/save-data', data);
  return response.data;
};
