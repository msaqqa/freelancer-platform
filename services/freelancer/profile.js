import { apiTaqat } from '../api';

// Save data for the "About" section
export const saveFreelancerAbout = async (payload) => {
  const response = await apiTaqat.post('/freelancer/about', payload);
  return response.data;
};

// Save data for the "Skills" section
export const saveFreelancerSkills = async (payload) => {
  const response = await apiTaqat.post('/freelancer/skills', payload);
  return response.data;
};

// Save data for the "Languages" section
export const saveFreelancerLanguages = async (payload) => {
  const response = await apiTaqat.post('/freelancer/languages', payload);
  return response.data;
};

// Save data for the "Socials" section
export const saveFreelancerSocials = async (payload) => {
  const response = await apiTaqat.post('/freelancer/socials', payload);
  return response.data;
};

// Save data for the "Send OTP" section
export const sendOtp = async (payload) => {
  const response = await apiTaqat.post('/freelancer/send-otp', payload);
  return response.data;
};

// Save data for the "Verify OTP" section
export const verifyOtp = async (payload) => {
  const response = await apiTaqat.post('/freelancer/verify-otp', payload);
  return response.data;
};

// Save data for the "Update Identity" section
export const updateIdentity = async (payload) => {
  const response = await apiTaqat.post('/freelancer/update-identity', payload);
  return response.data;
};

// Function to get freelancer summary
export const getFreelancerSummary = async () => {
  const response = await apiTaqat.get('/freelancer/summary');
  return response.data;
};

// Function to post freelancer summary data
export const postFreelancerSummary = async (payload) => {
  const response = await apiTaqat.post('/freelancer/summary', payload);
  return response.data;
};

// Function to delete freelancer image by ID
export const deleteFreelancerImage = async (imageId) => {
  const response = await apiTaqat.delete(
    `/freelancer/summary/image/${imageId}`,
  );
  return response.data;
};

// Function to get freelancer profile completion
export const getFreelancerProfileComplete = async () => {
  const response = await apiTaqat.get('/freelancer/profile-complete');
  return response.data;
};

// update the freelancer photo
export async function updateFreelancerPhoto(photoData) {
  const response = await apiTaqat.post('/freelancer/update-photo', photoData);
  return response.data;
}

// add a freelancer education
export async function addFreelancerEducation(educationData) {
  const response = await apiTaqat.post('/freelancer/educations', educationData);
  return response.data;
}

// update a freelancer education (by ID)
export async function updateFreelancerEducationById(
  educationId,
  educationData,
) {
  const response = await apiTaqat.put(
    `/freelancer/educations/${educationId}`,
    educationData,
  );
  return response.data;
}

// delete a freelancer education (by ID)
export async function deleteFreelancerEducationById(educationId) {
  const response = await apiTaqat.delete(
    `/freelancer/educations/${educationId}`,
  );
  return response.data;
}

// get the list of freelancer educations
export async function getFreelancerEducations() {
  const response = await apiTaqat.get('/freelancer/educations');
  return response.data;
}

// get freelancer education by id
export async function getFreelancerEducationById(educationId) {
  const response = await apiTaqat.get(`/freelancer/educations/${educationId}`);
  return response.data;
}

// resend OTP code to the freelancer mobile
export const resendMobileCode = async (payload) => {
  const response = await apiTaqat.post('/freelancer/resend-otp', payload);
  return response.data;
};
