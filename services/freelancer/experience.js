import { api } from '../api';

// UI stores dates as "MM-YYYY"; the DB column is a real date. Convert to the
// first day of the month so ordering/formatting stays consistent.
const toDbDate = (mmYyyy) => {
  if (!mmYyyy) return null;
  const [month, year] = String(mmYyyy).split('-');
  if (!month || !year) return null;
  return `${year}-${String(month).padStart(2, '0')}-01`;
};

// Map the modal's form values onto the API payload (DB column names).
const buildPayload = (values) => ({
  title: values.title ?? '',
  company: values.company ?? '',
  location: values.location || null,
  employment_type: values.type || null,
  description: values.description || null,
  start_date: toDbDate(values.start_date),
  end_date: toDbDate(values.end_date),
});

// get the list of freelancer experiences
export async function getFreelancerExperiences() {
  const { data } = await api.get('/freelancer/experience');
  return data;
}

// get freelancer experience by id
export async function getFreelancerExperienceById(experienceId) {
  if (!experienceId) return { data: null };
  const { data } = await api.get(`/freelancer/experience/${experienceId}`);
  return data;
}

// add a freelancer experience
export async function addFreelancerExperience(values) {
  const { data } = await api.post('/freelancer/experience', buildPayload(values));
  return data;
}

// update a freelancer experience
export async function updateFreelancerExperienceById(experienceId, values) {
  const { data } = await api.put(
    `/freelancer/experience/${experienceId}`,
    buildPayload(values),
  );
  return data;
}

// delete a freelancer experience
export async function deleteFreelancerExperienceById(experienceId) {
  const { data } = await api.delete(`/freelancer/experience/${experienceId}`);
  return data;
}
