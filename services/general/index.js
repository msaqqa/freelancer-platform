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
export async function getSubcategories(categoryId) {
  try {
    const response = await apiTaqat.get(`/subcategories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// Get list of skills
export async function getSkills(categoryId) {
  try {
    const response = await apiTaqat.get(`/skills/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

// get privacy policy content
export async function getPrivacyPolicy() {
  try {
    const response = await apiTaqat.get('/policies');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}
