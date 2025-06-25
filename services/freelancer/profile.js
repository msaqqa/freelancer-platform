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

// Save data for the "Send OTP" section
export const sendOtp = async (payload) => {
  try {
    const response = await apiTaqat.post('/freelancer/send-otp', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Save data for the "Verify OTP" section
export const verifyOtp = async (payload) => {
  try {
    const response = await apiTaqat.post('/freelancer/verify-otp', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Save data for the "Update Identity" section
export const updateIdentity = async (payload) => {
  try {
    const response = await apiTaqat.post(
      '/freelancer/update-identity',
      payload,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Function to get freelancer summary
export const getFreelancerSummary = async () => {
  try {
    const response = await apiTaqat.get('/freelancer/summary');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Function to post freelancer summary data
export const postFreelancerSummary = async (payload) => {
  try {
    const response = await apiTaqat.post('/freelancer/summary', payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Function to get freelancer profile completion
export const getFreelancerProfileComplete = async () => {
  try {
    const response = await apiTaqat.get('/freelancer/profile-complete');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// update the freelancer photo
export async function updateFreelancerPhoto(photoData) {
  try {
    const response = await apiTaqat.post('/update-photo', photoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// add a freelancer education
export async function addFreelancerEducation(educationData) {
  try {
    const response = await apiTaqat.post(
      '/freelancer/educations',
      educationData,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// update a freelancer education (by ID)
export async function updateFreelancerEducationById(
  educationId,
  educationData,
) {
  try {
    const response = await apiTaqat.put(
      `/freelancer/educations/${educationId}`,
      educationData,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// get the list of freelancer educations
export async function getFreelancerEducations() {
  try {
    const response = await apiTaqat.get('/freelancer/educations');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// get freelancer education by id
export async function getFreelancerEducationById(educationId) {
  try {
    const response = await apiTaqat.get(
      `/freelancer/educations/${educationId}`,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
