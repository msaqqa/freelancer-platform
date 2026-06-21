import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// Every getter returns { data: rows } to match the shape the UI already reads.
const unwrap = ({ data, error }) => {
  if (error) throw error;
  return { data };
};

// get the list of countries
export async function getCountries() {
  return unwrap(await supabase.from('countries').select('*').order('name'));
}

// get list of categories
export async function getCategories() {
  return unwrap(await supabase.from('categories').select('*').order('name'));
}

// get list of subcategories for a category
export async function getSubcategories(categoryId) {
  return unwrap(
    await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', categoryId)
      .order('name'),
  );
}

// Get list of skills (optionally filtered by category)
export async function getSkills(categoryId) {
  let query = supabase.from('skills').select('*').order('name');
  if (typeof categoryId === 'number' && !Number.isNaN(categoryId)) {
    query = query.eq('category_id', categoryId);
  }
  return unwrap(await query);
}

// get privacy policy content
export async function getPrivacyPolicy() {
  return unwrap(await supabase.from('policies').select('*'));
}

// Get list of socials
export async function getSocials() {
  return unwrap(await supabase.from('socials').select('*').order('name'));
}

// get the list of languages
export async function getLanguages() {
  return unwrap(await supabase.from('languages').select('*').order('name'));
}

// get the list of language levels
export async function getLanguageLevels() {
  return unwrap(
    await supabase.from('language_levels').select('*').order('rank'),
  );
}

// get the list of education degrees
export async function getEducationDegree() {
  return unwrap(
    await supabase.from('education_levels').select('*').order('name'),
  );
}

// get the list of grades
export async function getEducationGrades() {
  return unwrap(await supabase.from('grades').select('*').order('name'));
}
