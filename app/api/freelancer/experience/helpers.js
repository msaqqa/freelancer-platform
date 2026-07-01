import { NextResponse } from 'next/server';

export const EXPERIENCE_SELECT = '*';

// DB date ("YYYY-MM-DD") -> UI "MM-YYYY".
const fromDbDate = (date) => {
  if (!date) return null;
  const [year, month] = String(date).split('-');
  if (!year || !month) return null;
  return `${month}-${year}`;
};

export const mapExperience = (e) => ({
  id: e.id,
  title: e.title,
  company: e.company,
  location: e.location,
  type: e.employment_type,
  description: e.description,
  start_date: fromDbDate(e.start_date),
  end_date: fromDbDate(e.end_date),
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

// Whitelist the columns the experiences table owns.
export const pickExperienceColumns = (body) => ({
  title: body.title,
  company: body.company,
  location: body.location,
  employment_type: body.employment_type,
  description: body.description,
  start_date: body.start_date,
  end_date: body.end_date,
});
