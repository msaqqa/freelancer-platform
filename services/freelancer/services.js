import { apiTaqat } from '../api';

// get the list of freelancer services
export async function getFreelancerServices() {
  const response = await apiTaqat.get('/freelancer/service');
  return response.data;
}

// get freelancer service by id
export async function getFreelancerServiceById(serviceId) {
  const response = await apiTaqat.get(`/freelancer/service/${serviceId}`);
  return response.data;
}

// add a freelancer service
export async function addFreelancerService(serviceData) {
  const response = await apiTaqat.post('/freelancer/service', serviceData);
  return response.data;
}

// update a freelancer service
export async function updateFreelancerService(serviceId, serviceData) {
  const response = await apiTaqat.put(
    `/freelancer/service/${serviceId}`,
    serviceData,
  );
  return response.data;
}

// delete a freelancer service
export async function deleteFreelancerService(serviceId) {
  const response = await apiTaqat.delete(`/freelancer/service/${serviceId}`);
  return response.data;
}
