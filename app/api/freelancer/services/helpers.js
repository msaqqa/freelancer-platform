import { NextResponse } from 'next/server';

// Embed skills wherever a service is read.
export const SERVICE_SELECT =
  '*, service_skills(skill:skills(id, name, name_ar))';

export const mapService = (s) => ({
  id: s.id,
  title: s.title,
  description: s.description,
  image: (s.images ?? [])[0] ?? null,
  images: s.images ?? [],
  price: s.price,
  delivery_days: s.delivery_days,
  status: s.status,
  category_id: s.category_id,
  subcategory_id: s.subcategory_id,
  pricing: s.pricing ?? {},
  requirements: s.requirements ?? [],
  skills: (s.service_skills ?? []).map((r) => r.skill).filter(Boolean),
  created_at: s.created_at,
});

export async function getUser(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export const unauthorized = () =>
  NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

export const badRequest = (message) =>
  NextResponse.json({ message }, { status: 400 });

// Replace a service's skill set with the given skill ids.
export async function syncSkills(supabase, serviceId, skills) {
  const ids = (Array.isArray(skills) ? skills : []).map(Number).filter(Boolean);

  const { error: delError } = await supabase
    .from('service_skills')
    .delete()
    .eq('service_id', serviceId);
  if (delError) throw delError;

  if (ids.length) {
    const { error: insError } = await supabase
      .from('service_skills')
      .insert(ids.map((skill_id) => ({ service_id: serviceId, skill_id })));
    if (insError) throw insError;
  }
}

// Only the columns the services table owns (skills go to the join table).
export const pickServiceColumns = ({ skills, ...row }) => row;
