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
} from './helpers';

// GET /api/freelancer/services — list the current user's services
export async function GET() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const { data, error } = await supabase
    .from('services')
    .select(SERVICE_SELECT)
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false });
  if (error) return badRequest(error.message);

  return NextResponse.json({ data: (data ?? []).map(mapService) });
}

// POST /api/freelancer/services — create a service
export async function POST(request) {
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) return unauthorized();

  const body = await request.json();

  const { data, error } = await supabase
    .from('services')
    .insert({ profile_id: user.id, ...pickServiceColumns(body) })
    .select('id')
    .single();
  if (error) return badRequest(error.message);

  try {
    await syncSkills(supabase, data.id, body.skills);
  } catch (e) {
    return badRequest(e.message);
  }

  return NextResponse.json({
    message: 'Service added successfully',
    data: { id: data.id },
  });
}
