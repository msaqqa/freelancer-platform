import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  SERVICE_SELECT,
  badRequest,
  getUser,
  mapService,
  pickServiceColumns,
  syncSkills,
  unauthorized,
} from '../helpers';

// GET /api/freelancer/services/:id
export async function GET(_request, { params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const { data, error } = await supabase
    .from('services')
    .select(SERVICE_SELECT)
    .eq('id', id)
    .maybeSingle();
  if (error) return badRequest(error.message);

  return NextResponse.json({ data: data ? mapService(data) : null });
}

// PUT /api/freelancer/services/:id
export async function PUT(request, { params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const body = await request.json();

  const { error } = await supabase
    .from('services')
    .update(pickServiceColumns(body))
    .eq('id', id)
    .eq('profile_id', user.id);
  if (error) return badRequest(error.message);

  try {
    await syncSkills(supabase, id, body.skills);
  } catch (e) {
    return badRequest(e.message);
  }

  return NextResponse.json({ message: 'Service updated successfully' });
}

// DELETE /api/freelancer/services/:id
export async function DELETE(_request, { params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
    .eq('profile_id', user.id);
  if (error) return badRequest(error.message);

  return NextResponse.json({ message: 'Service deleted successfully' });
}
