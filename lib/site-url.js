// Canonical site URL for building auth redirect/callback links.
// Prefers NEXT_PUBLIC_SITE_URL (set this to the deployed domain on Vercel),
// falls back to the current origin in the browser, then localhost.
export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return 'http://localhost:3000';
}
