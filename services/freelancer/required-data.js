import { createClient } from '@/lib/supabase/client';
import { uploadFile } from '@/lib/supabase/storage';

const supabase = createClient();

// Save the freelancer onboarding data. Expects a plain object:
//   { photo?, name, mobile, gender, birth_date, country_id,
//     category_id, sub_category_id, skills: number[], bio, hourly_rate,
//     available_hire }
export const addRequiredDataFreelancer = async (data) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // 1. Upload photo (if a new file was picked)
  let avatarUrl;
  if (data.photo instanceof File) {
    avatarUrl = await uploadFile(data.photo, 'avatars');
  }

  // 2. Core profile fields
  const profilePatch = {
    full_name: data.name,
    phone: data.mobile,
    gender: data.gender,
    birth_date: data.birth_date || null,
    country_id: data.country_id ? Number(data.country_id) : null,
    profile_complete: true,
  };
  if (avatarUrl) profilePatch.avatar_url = avatarUrl;

  const { error: pErr } = await supabase
    .from('profiles')
    .update(profilePatch)
    .eq('id', user.id);
  if (pErr) throw pErr;

  // 3. Freelancer "about" section
  const { error: aErr } = await supabase.from('freelancer_about').upsert(
    {
      profile_id: user.id,
      category_id: data.category_id ? Number(data.category_id) : null,
      subcategory_id: data.sub_category_id
        ? Number(data.sub_category_id)
        : null,
      description: data.bio,
      hourly_rate: data.hourly_rate ? Number(data.hourly_rate) : null,
      available: data.available_hire ? true : false,
    },
    { onConflict: 'profile_id' },
  );
  if (aErr) throw aErr;

  // 4. Skills (replace any existing set)
  await supabase.from('freelancer_skills').delete().eq('profile_id', user.id);
  const skillIds = Array.isArray(data.skills) ? data.skills : [];
  if (skillIds.length) {
    const rows = skillIds.map((skill_id) => ({
      profile_id: user.id,
      skill_id: Number(skill_id),
    }));
    const { error: sErr } = await supabase
      .from('freelancer_skills')
      .insert(rows);
    if (sErr) throw sErr;
  }

  return { message: 'Profile saved successfully' };
};
