import { apiTaqat } from '../api';

// get the list of countries
export async function getCountries() {
  try {
    const response = await apiTaqat.get('/countries');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// get list of categories
export async function getCategories() {
  try {
    const response = await apiTaqat.get('/categories');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// get list of subcategories
export async function getSubcategories() {
  try {
    const response = await apiTaqat.get('/subcategories');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// Get list of skills
export async function getSkills() {
  try {
    const response = await apiTaqat.get('/skills');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
