import { apiTaqat } from '../api';

// get the list of freelancer services
export async function getFreelancerServices() {
  try {
    const response = await apiTaqat.get('/freelancer/service');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get freelancer service by id
export async function getFreelancerServiceById(serviceId) {
  try {
    const response = await apiTaqat.get(`/freelancer/service/${serviceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// add a freelancer service
export async function addFreelancerService(serviceData) {
  try {
    const response = await apiTaqat.post('/freelancer/service', serviceData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// update a freelancer service
export async function updateFreelancerService(serviceId, serviceData) {
  try {
    const response = await apiTaqat.put(
      `/freelancer/service/${serviceId}`,
      serviceData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// delete a freelancer service
export async function deleteFreelancerService(serviceId) {
  try {
    const response = await apiTaqat.delete(`/freelancer/service/${serviceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
