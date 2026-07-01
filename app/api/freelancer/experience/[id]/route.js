import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  EXPERIENCE_SELECT,
  badRequest,
  getUser,
  mapExperience,
  pickExperienceColumns,
  unauthorized,
} from '../helpers';

// GET /api/freelancer/experience/:id
export async function GET(_request, { params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const { data, error } = await supabase
    .from('experiences')
    .select(EXPERIENCE_SELECT)
    .eq('id', id)
    .maybeSingle();
  if (error) return badRequest(error.message);

  return NextResponse.json({ data: data ? mapExperience(data) : null });
}

// PUT /api/freelancer/experience/:id
export async function PUT(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const body = await request.json();

  const { error } = await supabase
    .from('experiences')
    .update(pickExperienceColumns(body))
    .eq('id', id)
    .eq('profile_id', user.id);
  if (error) return badRequest(error.message);

  return NextResponse.json({ message: 'Experience updated successfully' });
}

// DELETE /api/freelancer/experience/:id
export async function DELETE(_request, { params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id)
    .eq('profile_id', user.id);
  if (error) return badRequest(error.message);

  return NextResponse.json({ message: 'Experience deleted successfully' });
}
