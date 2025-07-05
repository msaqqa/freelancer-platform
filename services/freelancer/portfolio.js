import { apiTaqat } from '../api';

// add a freelancer portfolio
export async function addFreelancerPortfolio(portfolioData) {
  try {
    const response = await apiTaqat.post(
      '/freelancer/portfolio',
      portfolioData,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// update a freelancer portfolio by id
export async function updateFreelancerPortfolioById(
  portfolioId,
  portfolioData,
) {
  try {
    const response = await apiTaqat.post(
      `/freelancer/portfolio/${portfolioId}`,
      portfolioData,
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// get the list of freelancer portfolio
export async function getFreelancerPortfolios() {
  try {
    const response = await apiTaqat.get('/freelancer/portfolio');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// get portfolio Portfolio by id
export async function getFreelancerPortfolioById(portfolioId) {
  try {
    const response = await apiTaqat.get(`/freelancer/portfolio/${portfolioId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
