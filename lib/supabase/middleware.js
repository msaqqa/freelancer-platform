import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// Refreshes the auth session on every request and keeps cookies in sync.
export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase env vars are missing (e.g. not configured on the host), skip
  // session refresh instead of crashing the whole app with a 500.
  if (!url || !anonKey) {
    return { supabaseResponse, user: null };
  }

  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: getUser() refreshes the token. Do not run code between
  // createServerClient and getUser, or sessions may randomly log out.
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return { supabaseResponse, user };
  } catch {
    // Never let an auth/network hiccup turn into a 500 on every route.
    return { supabaseResponse, user: null };
  }
}
