import { uploadFiles } from '@/lib/supabase/storage';
import { api } from '../api';

// Map the multi-step modal's form values onto the API payload. New File images
// are uploaded to Storage first; existing URL strings are kept as-is.
const buildPayload = async (values) => {
  const imgs = Array.isArray(values.images) ? values.images : [];
  const files = imgs.filter((f) => f instanceof File);
  const existing = imgs.filter((f) => typeof f === 'string');
  const uploaded = files.length ? await uploadFiles(files, 'services') : [];

  const skills = (values.skills ?? [])
    .map((s) => (s && typeof s === 'object' ? s.id : s))
    .filter(Boolean);

  const num = (v) => (v === '' || v == null ? null : Number(v));

  return {
    title: values.service ?? '',
    description: values.description ?? '',
    category_id: num(values.category),
    subcategory_id: num(values.specialty),
    price: num(values['Project price']),
    delivery_days: num(values['delivery-Days']),
    status: 'active',
    images: [...existing, ...uploaded],
    pricing: {
      revisions: values.revisions ?? null,
      addOns: values.addOns ?? [],
      customAddOns: values.customAddOns ?? [],
    },
    requirements: values.requirements ?? [],
    skills,
  };
};

// get the list of freelancer services
export async function getFreelancerServices() {
  const { data } = await api.get('/freelancer/services');
  return data;
}

// get freelancer service by id
export async function getFreelancerServiceById(serviceId) {
  if (!serviceId) return { data: null };
  const { data } = await api.get(`/freelancer/services/${serviceId}`);
  return data;
}

// add a freelancer service
export async function addFreelancerService(values) {
  const payload = await buildPayload(values);
  const { data } = await api.post('/freelancer/services', payload);
  return data;
}

// update a freelancer service
export async function updateFreelancerService(serviceId, values) {
  const payload = await buildPayload(values);
  const { data } = await api.put(`/freelancer/services/${serviceId}`, payload);
  return data;
}

// delete a freelancer service
export async function deleteFreelancerService(serviceId) {
  const { data } = await api.delete(`/freelancer/services/${serviceId}`);
  return data;
}
