import { apiTaqat } from '../api';

// Save data for the "About" section
export const saveFreelancerAbout = async (payload) => {
  try {
    const response = await apiTaqat.post('/freelancer/about', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Save data for the "Skills" section
export const saveFreelancerSkills = async (payload) => {
  try {
    const response = await apiTaqat.post('/freelancer/skills', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Save data for the "Languages" section
export const saveFreelancerLanguages = async (payload) => {
  try {
    const response = await apiTaqat.post('/freelancer/languages', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Save data for the "Socials" section
export const saveFreelancerSocials = async (payload) => {
  try {
    const response = await apiTaqat.post('/freelancer/socials', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
