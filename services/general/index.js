import { apiTaqat } from '../api';

// get the list of countries
export async function getCountries() {
  try {
    const response = await apiTaqat.get('/countries');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get list of categories
export async function getCategories() {
  try {
    const response = await apiTaqat.get('/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get list of subcategories
export async function getSubcategories(categoryId) {
  try {
    const response = await apiTaqat.get(`/subcategories/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get list of skills
export async function getSkills(categoryId) {
  const url =
    typeof categoryId === 'number' ? `/skills/${categoryId}` : '/skills';
  try {
    const response = await apiTaqat.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get privacy policy content
export async function getPrivacyPolicy() {
  try {
    const response = await apiTaqat.get('/policies');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get list of socials
export async function getSocials() {
  try {
    const response = await apiTaqat.get('/social');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get the list of languages
export async function getLanguages() {
  try {
    const response = await apiTaqat.get('/languages');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get the list of language levels
export async function getLanguageLevels() {
  try {
    const response = await apiTaqat.get('/languages_levels');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get the list of education Degree
export async function getEducationDegree() {
  try {
    const response = await apiTaqat.get('/education-levels');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// get the list of grades
export async function getEducationGrades() {
  try {
    const response = await apiTaqat.get('/grade');
    return response.data;
  } catch (error) {
    throw error;
  }
}
