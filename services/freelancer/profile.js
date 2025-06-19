import { apiTaqat } from '../api';

// Save data for the "About" section
export const saveFreelancerAbout = async (data) => {
  try {
    const response = await apiTaqat.post('/freelancer/about', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Save data for the "Skills" section
export const saveFreelancerSkills = async (data) => {
  try {
    const response = await apiTaqat.post('/freelancer/skills', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Save data for the "Languages" section
export const saveFreelancerLanguages = async (data) => {
  try {
    const response = await apiTaqat.post('/freelancer/languages', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Save data for the "Socials" section
export const saveFreelancerSocials = async (data) => {
  try {
    const response = await apiTaqat.post('/freelancer/socials', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
