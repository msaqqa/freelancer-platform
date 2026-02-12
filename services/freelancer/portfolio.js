import { apiTaqat } from '../api';

// add a freelancer portfolio
export async function addFreelancerPortfolio(portfolioData) {
  const response = await apiTaqat.post('/freelancer/portfolio', portfolioData);
  return response.data;
}

// update a freelancer portfolio by id
export async function updateFreelancerPortfolio(portfolioId, portfolioData) {
  const response = await apiTaqat.post(
    `/freelancer/portfolio/${portfolioId}`,
    portfolioData,
  );
  return response.data;
}

// get the list of freelancer portfolio
export async function getFreelancerPortfolios() {
  const response = await apiTaqat.get('/freelancer/portfolio');
  return response.data;
}

// get portfolio Portfolio by id
export async function getFreelancerPortfolioById(portfolioId) {
  const response = await apiTaqat.get(`/freelancer/portfolio/${portfolioId}`);
  return response.data;
}
