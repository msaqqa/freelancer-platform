import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Exchanges the OAuth / recovery code for a session, then routes the user.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Recovery / explicit destination wins over profile-based routing.
      if (next) {
        return NextResponse.redirect(`${origin}${next}`);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type, profile_complete')
        .eq('id', user.id)
        .single();

      const type = profile?.user_type;
      const done = profile?.profile_complete;

      let dest = '/new-user/account-type';
      if (type && done) {
        dest = type === 'client' ? '/client' : '/freelancer';
      } else if (type && !done) {
        dest = '/new-user/required-data';
      }
      return NextResponse.redirect(`${origin}${dest}`);
    }
  }

  return NextResponse.redirect(`${origin}/signin?error=oauth`);
}
