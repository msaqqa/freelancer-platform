import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  EXPERIENCE_SELECT,
  badRequest,
  getUser,
  mapExperience,
  pickExperienceColumns,
  unauthorized,
} from './helpers';

// GET /api/freelancer/experience — list the current user's experiences
export async function GET() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const { data, error } = await supabase
    .from('experiences')
    .select(EXPERIENCE_SELECT)
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false });
  if (error) return badRequest(error.message);

  return NextResponse.json({ data: (data ?? []).map(mapExperience) });
}

// POST /api/freelancer/experience — create an experience
export async function POST(request) {
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const body = await request.json();

  const { data, error } = await supabase
    .from('experiences')
    .insert({ profile_id: user.id, ...pickExperienceColumns(body) })
    .select('id')
    .single();
  if (error) return badRequest(error.message);

  return NextResponse.json({
    message: 'Experience added successfully',
    data: { id: data.id },
  });
}
