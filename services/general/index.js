import { apiTaqat } from '../api';

// get the list of countries
export async function getCountries() {
  const response = await apiTaqat.get('/countries');
  return response.data;
}

// get list of categories
export async function getCategories() {
  const response = await apiTaqat.get('/categories');
  return response.data;
}

// get list of subcategories
export async function getSubcategories(categoryId) {
  const response = await apiTaqat.get(`/subcategories/${categoryId}`);
  return response.data;
}

// Get list of skills
export async function getSkills(categoryId) {
  const url =
    typeof categoryId === 'number' ? `/skills/${categoryId}` : '/skills';
  const response = await apiTaqat.get(url);
  return response.data;
}

// get privacy policy content
export async function getPrivacyPolicy() {
  const response = await apiTaqat.get('/policies');
  return response.data;
}

// Get list of socials
export async function getSocials() {
  const response = await apiTaqat.get('/social');
  return response.data;
}

// get the list of languages
export async function getLanguages() {
  const response = await apiTaqat.get('/languages');
  return response.data;
}

// get the list of language levels
export async function getLanguageLevels() {
  const response = await apiTaqat.get('/languages_levels');
  return response.data;
}

// get the list of education Degree
export async function getEducationDegree() {
  const response = await apiTaqat.get('/education-levels');
  return response.data;
}

// get the list of grades
export async function getEducationGrades() {
  const response = await apiTaqat.get('/grade');
  return response.data;
}
