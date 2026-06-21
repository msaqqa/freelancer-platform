import { createClient } from '@/lib/supabase/client';
import { uploadFile } from '@/lib/supabase/storage';

const supabase = createClient();

// Save the client onboarding data. Expects a plain object:
//   { photo?, name, bio, country_id, website }
export const saveClientRequiredData = async (data) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  let avatarUrl;
  if (data.photo instanceof File) {
    avatarUrl = await uploadFile(data.photo, 'avatars');
  }

  const patch = {
    full_name: data.name,
    bio: data.bio,
    website: data.website,
    country_id: data.country_id ? Number(data.country_id) : null,
    profile_complete: true,
  };
  if (avatarUrl) patch.avatar_url = avatarUrl;

  const { error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', user.id);
  if (error) throw error;

  return { message: 'Profile saved successfully' };
};
