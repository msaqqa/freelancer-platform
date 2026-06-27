import { getSiteUrl } from '@/lib/site-url';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// Helper: surface Supabase auth errors the same way axios errors were thrown.
const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

// signup a new user with credentials. Supabase sends an email OTP for
// confirmation (template must use {{ .Token }}).
export const signupWithCredentials = async (userData) => {
  const { email, password, name, full_name } = userData;
  return unwrap(
    await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: full_name ?? name } },
    }),
  );
};

// signin the user with email + password
export const signinWithCredentials = async (credentials) => {
  const { email, password } = credentials;
  const auth = unwrap(
    await supabase.auth.signInWithPassword({ email, password }),
  );

  // Check if email is confirmed; if not, return confirmation status.
  const emailConfirmed =
    auth.user?.email_confirmed_at !== null &&
    auth.user?.email_confirmed_at !== undefined;

  // Pull the profile so callers can route by user_type / completion state.
  const { data: profile } = await supabase
    .from('profiles')
    .select('user_type, profile_complete')
    .eq('id', auth.user.id)
    .single();

  return { ...auth, profile, emailConfirmed };
};

// start Google OAuth via Supabase
export const getGoogleOAuthUrl = async () => {
  return unwrap(
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${getSiteUrl()}/auth/callback` },
    }),
  );
};

// user forgot password — sends a recovery email (OTP / link)
export const forgetPassword = async (payload) => {
  const email = typeof payload === 'string' ? payload : payload?.email;
  return unwrap(
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getSiteUrl()}/auth/callback?next=/reset-password`,
    }),
  );
};

// set a new password for the currently recovered session
export const resetPassword = async (payload) => {
  return unwrap(
    await supabase.auth.updateUser({
      password: payload?.newPassword ?? payload?.password,
    }),
  );
};

// verify the email OTP sent on signup
export const verifyEmailOtp = async ({ email, otpCode }) => {
  return unwrap(
    await supabase.auth.verifyOtp({ email, token: otpCode, type: 'email' }),
  );
};

// resend the signup confirmation OTP
export const resendVerificationCode = async (contact) => {
  const email = typeof contact === 'string' ? contact : contact?.email;
  return unwrap(await supabase.auth.resend({ type: 'signup', email }));
};

// get the current user's profile
export async function getAuthUserData() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Use maybeSingle: a brand-new user's profile row may not exist yet (the DB
  // trigger can lag the first read). single() would error on "no rows", which
  // bubbles up as isError and bounces the user to /signin. maybeSingle returns
  // null instead, so we treat it as "signed in, onboarding not started".
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();
  if (error) throw error;

  // Alias to the field names the existing UI reads (type / save_data).
  return {
    data: {
      ...(profile ?? {}),
      email: user.email,
      type: profile?.user_type ?? null,
      save_data: profile?.profile_complete ?? null,
    },
  };
}

// change the user's language preference
export async function changeLang(lang) {
  const value = typeof lang === 'string' ? lang : lang?.lang;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return unwrap(
    await supabase
      .from('profiles')
      .update({ lang: value })
      .eq('id', user.id)
      .select()
      .single(),
  );
}

// signout the user
export const signoutUser = async () => {
  return unwrap(await supabase.auth.signOut());
};

// choose whether the user is a client or a freelancer.
// The onboarding screen sends type 1 (client) or 2 (freelancer).
export const submitAccountType = async (payload) => {
  const userType =
    payload?.type === 1 || payload?.type === 'client' ? 'client' : 'freelancer';
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const row = unwrap(
    await supabase
      .from('profiles')
      .update({ user_type: userType })
      .eq('id', user.id)
      .select()
      .single(),
  );
  return { message: 'Account type saved', data: row };
};
