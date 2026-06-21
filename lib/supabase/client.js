import { createBrowserClient } from '@supabase/ssr';

// Browser-side Supabase client (Client Components, hooks)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

// Shared singleton for convenience in client code
export const supabase = createClient();
