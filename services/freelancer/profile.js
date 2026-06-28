import { formatDate } from '@/lib/helpers';
import { createClient } from '@/lib/supabase/client';
import { deleteFile, uploadFile, uploadFiles } from '@/lib/supabase/storage';

const supabase = createClient();

// Resolve the signed-in user or throw the same way the old axios layer did.
const requireUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  return user;
};

const fail = ({ error }) => {
  if (error) throw error;
};

// "MM-YYYY" (UI) <-> "YYYY-MM-01" (DB date column)
const toDbDate = (mmYyyy) => {
  if (!mmYyyy) return null;
  const [month, year] = String(mmYyyy).split('-');
  if (!month || !year) return null;
  return `${year}-${String(month).padStart(2, '0')}-01`;
};
const fromDbDate = (date) => {
  if (!date) return null;
  const [year, month] = String(date).split('-');
  if (!year || !month) return null;
  return `${month}-${year}`; // months are stored two-digit ('01'..'12')
};

// Only include keys whose value is defined (so upserts never clobber columns
// the caller didn't intend to touch).
const defined = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

// =============================================================================
// Aggregate read: builds the nested `user` object the Profile tab components
// consume (About / Skills / Socials / CommunityBadges / UserHero).
// =============================================================================
export async function getFreelancerProfile() {
  const user = await requireUser();

  const [
    { data: profile },
    { data: about },
    { data: skillRows },
    { data: socialRows },
    { data: badgeRows },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('*, country:countries(id, name, name_ar)')
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('freelancer_about')
      .select(
        '*, category:categories(id, name, name_ar), sub_category:subcategories(id, name, name_ar)',
      )
      .eq('profile_id', user.id)
      .maybeSingle(),
    supabase
      .from('freelancer_skills')
      .select('skill:skills(id, name, name_ar)')
      .eq('profile_id', user.id),
    supabase
      .from('freelancer_socials')
      .select('id, url, label, social:socials(id, name, icon, base_url)')
      .eq('profile_id', user.id),
    supabase
      .from('freelancer_badges')
      .select('badge:badges(id, name, name_ar, icon)')
      .eq('profile_id', user.id),
  ]);

  // Identity status codes the UI expects: 1 = verified, 2 = not verified yet.
  const idVerified = !!profile?.identity_verified;

  return {
    data: {
      id: user.id,
      email: user.email,
      name: profile?.full_name ?? '',
      photo: profile?.avatar_url ?? '',
      gender: profile?.gender ?? null,
      birth_date: profile?.birth_date ?? null,
      country: profile?.country ?? null,
      available_hire: about?.available ?? false,
      hourly_rate: about?.hourly_rate ?? 0,
      experience: about?.experience ?? 0,
      total_jobs: about?.total_jobs ?? 0,
      category: about?.category ?? null,
      sub_category: about?.sub_category ?? null,
      bio: about?.description ?? '',
      skills: (skillRows ?? []).map((r) => r.skill).filter(Boolean),
      socials: (socialRows ?? []).map((r) => ({
        id: r.social?.id ?? null,
        name: r.social?.name ?? r.label ?? '',
        icon: r.social?.icon ?? '',
        link: r.url,
      })),
      badges: (badgeRows ?? []).map((r) => r.badge).filter(Boolean),
      id_verified: {
        status: idVerified ? 1 : 2,
        label: idVerified ? 'Verified' : 'Not verified',
      },
      joined_date: profile?.created_at ? formatDate(profile.created_at) : '',
    },
  };
}

// =============================================================================
// About: country lives on profiles, the rest on freelancer_about.
// payload: { available_hire, hourly_rate, category_id, sub_category_id,
//            country_id, experience }
// =============================================================================
export const saveFreelancerAbout = async (payload) => {
  const user = await requireUser();

  if (payload.country_id != null && payload.country_id !== '') {
    fail(
      await supabase
        .from('profiles')
        .update({ country_id: Number(payload.country_id) })
        .eq('id', user.id),
    );
  }

  const aboutPatch = defined({
    category_id:
      payload.category_id != null && payload.category_id !== ''
        ? Number(payload.category_id)
        : undefined,
    subcategory_id:
      payload.sub_category_id != null && payload.sub_category_id !== ''
        ? Number(payload.sub_category_id)
        : undefined,
    hourly_rate:
      payload.hourly_rate != null && payload.hourly_rate !== ''
        ? Number(payload.hourly_rate)
        : undefined,
    available:
      payload.available_hire === undefined
        ? undefined
        : !!payload.available_hire,
    experience:
      payload.experience != null && payload.experience !== ''
        ? Number(payload.experience)
        : undefined,
  });

  fail(
    await supabase
      .from('freelancer_about')
      .upsert({ profile_id: user.id, ...aboutPatch }, { onConflict: 'profile_id' }),
  );

  return { message: 'About updated successfully' };
};

// =============================================================================
// Skills: replace the whole set. payload: { skills: number[] }
// =============================================================================
export const saveFreelancerSkills = async ({ skills = [] }) => {
  const user = await requireUser();

  fail(await supabase.from('freelancer_skills').delete().eq('profile_id', user.id));

  const ids = (Array.isArray(skills) ? skills : []).filter(Boolean);
  if (ids.length) {
    fail(
      await supabase.from('freelancer_skills').insert(
        ids.map((skill_id) => ({
          profile_id: user.id,
          skill_id: Number(skill_id),
        })),
      ),
    );
  }
  return { message: 'Skills updated successfully' };
};

// =============================================================================
// Languages: replace the whole set. payload: { languages: [{language_id, level_id}] }
// (UI section is currently disabled, kept for parity.)
// =============================================================================
export const saveFreelancerLanguages = async ({ languages = [] }) => {
  const user = await requireUser();

  fail(
    await supabase.from('freelancer_languages').delete().eq('profile_id', user.id),
  );

  const rows = (Array.isArray(languages) ? languages : [])
    .filter((l) => l?.language_id)
    .map((l) => ({
      profile_id: user.id,
      language_id: Number(l.language_id),
      level_id: l.level_id ? Number(l.level_id) : null,
    }));
  if (rows.length) {
    fail(await supabase.from('freelancer_languages').insert(rows));
  }
  return { message: 'Languages updated successfully' };
};

// =============================================================================
// Socials: replace the whole set.
// payload: { socials: [{social_id, link}], custom: [{title, link}] }
// =============================================================================
export const saveFreelancerSocials = async ({ socials = [], custom = [] }) => {
  const user = await requireUser();

  fail(await supabase.from('freelancer_socials').delete().eq('profile_id', user.id));

  const rows = [
    ...(socials ?? [])
      .filter((s) => s?.social_id && s?.link)
      .map((s) => ({
        profile_id: user.id,
        social_id: Number(s.social_id),
        url: s.link,
      })),
    ...(custom ?? [])
      .filter((c) => c?.title && c?.link)
      .map((c) => ({
        profile_id: user.id,
        social_id: null,
        label: c.title,
        url: c.link,
      })),
  ];
  if (rows.length) {
    fail(await supabase.from('freelancer_socials').insert(rows));
  }
  return { message: 'Socials updated successfully' };
};

// =============================================================================
// Summary (rich section) + gallery images
// =============================================================================
export const getFreelancerSummary = async () => {
  const user = await requireUser();

  const [{ data: summary }, { data: images }] = await Promise.all([
    supabase
      .from('freelancer_summary')
      .select('*')
      .eq('profile_id', user.id)
      .maybeSingle(),
    supabase
      .from('summary_images')
      .select('id, image_url, sort_order')
      .eq('profile_id', user.id)
      .order('sort_order'),
  ]);

  return {
    data: {
      bio: summary?.description ?? '',
      images_title: summary?.images_title ?? '',
      video: summary?.video_url ?? '',
      video_title: summary?.video_title ?? '',
      images_urls: (images ?? []).map((i) => ({ id: i.id, url: i.image_url })),
    },
  };
};

// payload: { bio, images_title, video, video_title, images: File[] }
export const postFreelancerSummary = async (payload) => {
  const user = await requireUser();

  fail(
    await supabase.from('freelancer_summary').upsert(
      defined({
        profile_id: user.id,
        description: payload.bio ?? '',
        images_title: payload.images_title,
        video_url: payload.video,
        video_title: payload.video_title,
      }),
      { onConflict: 'profile_id' },
    ),
  );

  const files = (payload.images ?? []).filter((f) => f instanceof File);
  if (files.length) {
    const urls = await uploadFiles(files, 'summary');
    fail(
      await supabase.from('summary_images').insert(
        urls.map((url, i) => ({
          profile_id: user.id,
          image_url: url,
          sort_order: i,
        })),
      ),
    );
  }
  return { message: 'Summary updated successfully' };
};

export const deleteFreelancerImage = async (imageId) => {
  await requireUser();

  const { data: img } = await supabase
    .from('summary_images')
    .select('image_url')
    .eq('id', imageId)
    .maybeSingle();

  if (img?.image_url) {
    try {
      await deleteFile(img.image_url, 'summary');
    } catch {
      // Orphan storage object is harmless; still drop the DB row.
    }
  }
  fail(await supabase.from('summary_images').delete().eq('id', imageId));
  return { message: 'Image deleted successfully' };
};

// =============================================================================
// Profile completion (drives the "Verify Badge" progress card).
// Returns [{ completed_items, total_items, percentage, completion_text }].
// =============================================================================
export const getFreelancerProfileComplete = async () => {
  const user = await requireUser();

  const [
    { data: profile },
    { data: about },
    { count: skillsCount },
    { count: socialsCount },
    { count: eduCount },
    { data: summary },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('avatar_url, full_name, country_id')
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('freelancer_about')
      .select('category_id, subcategory_id, hourly_rate')
      .eq('profile_id', user.id)
      .maybeSingle(),
    supabase
      .from('freelancer_skills')
      .select('id', { count: 'exact', head: true })
      .eq('profile_id', user.id),
    supabase
      .from('freelancer_socials')
      .select('id', { count: 'exact', head: true })
      .eq('profile_id', user.id),
    supabase
      .from('educations')
      .select('id', { count: 'exact', head: true })
      .eq('profile_id', user.id),
    supabase
      .from('freelancer_summary')
      .select('description')
      .eq('profile_id', user.id)
      .maybeSingle(),
  ]);

  // Each entry drives both the progress numbers and the checklist (Connections)
  // shown inside the "Get verified badge" dialog.
  const status = [
    {
      name: 'Profile photo',
      completion_text: 'Upload a profile photo',
      is_completed: !!profile?.avatar_url,
    },
    {
      name: 'Full name',
      completion_text: 'Add your full name',
      is_completed: !!profile?.full_name,
    },
    {
      name: 'Country',
      completion_text: 'Select your country',
      is_completed: !!profile?.country_id,
    },
    {
      name: 'Specialty',
      completion_text: 'Pick your industry and specialty',
      is_completed: !!(about?.category_id && about?.subcategory_id),
    },
    {
      name: 'Hourly rate',
      completion_text: 'Set your hourly rate',
      is_completed: !!about?.hourly_rate,
    },
    {
      name: 'Skills',
      completion_text: 'Add at least one skill',
      is_completed: (skillsCount ?? 0) > 0,
    },
    {
      name: 'Social links',
      completion_text: 'Link at least one social account',
      is_completed: (socialsCount ?? 0) > 0,
    },
    {
      name: 'Education',
      completion_text: 'Add your education',
      is_completed: (eduCount ?? 0) > 0,
    },
    {
      name: 'Summary',
      completion_text: 'Write a short summary',
      is_completed: !!summary?.description,
    },
  ];

  const total_items = status.length;
  const completed_items = status.filter((s) => s.is_completed).length;
  const percentage = Math.round((completed_items / total_items) * 100);
  const completion_text = `${completed_items} of ${total_items} sections completed`;

  return {
    data: [
      {
        completed_items,
        total_items,
        percentage,
        completion_text,
        completionText: completion_text,
        status,
      },
    ],
  };
};

// =============================================================================
// Avatar
// =============================================================================
// Accepts a File, a { photo: File }, or a FormData carrying "photo".
export async function updateFreelancerPhoto(photoData) {
  const user = await requireUser();

  let file = photoData;
  if (photoData instanceof FormData) file = photoData.get('photo');
  else if (photoData && photoData.photo) file = photoData.photo;
  if (!(file instanceof File)) throw new Error('No photo provided');

  const avatarUrl = await uploadFile(file, 'avatars');
  fail(
    await supabase.from('profiles').update({ avatar_url: avatarUrl }).eq('id', user.id),
  );
  return { message: 'Photo updated successfully', data: { avatar_url: avatarUrl } };
}

// =============================================================================
// Educations CRUD. UI field names <-> schema columns:
//   university <-> institution, field_of_study <-> field,
//   education_level_id <-> level_id, grade <-> grade_id,
//   start_date/end_date "MM-YYYY" <-> date column.
// =============================================================================
const educationSelect =
  '*, degree:education_levels(id, name, name_ar), grade:grades(id, name, name_ar)';

const mapEducation = (e) => ({
  id: e.id,
  university: e.institution,
  field_of_study: e.field,
  degree: e.degree,
  grade: e.grade,
  description: e.description,
  start_date: fromDbDate(e.start_date),
  end_date: fromDbDate(e.end_date),
});

const educationPatch = (data) =>
  defined({
    institution: data.university,
    field: data.field_of_study,
    level_id: data.education_level_id
      ? Number(data.education_level_id)
      : data.education_level_id === '' || data.education_level_id === null
        ? null
        : undefined,
    grade_id: data.grade
      ? Number(data.grade)
      : data.grade === '' || data.grade === null
        ? null
        : undefined,
    start_date: data.start_date !== undefined ? toDbDate(data.start_date) : undefined,
    end_date: data.end_date !== undefined ? toDbDate(data.end_date) : undefined,
  });

export async function addFreelancerEducation(educationData) {
  const user = await requireUser();
  fail(
    await supabase
      .from('educations')
      .insert({ profile_id: user.id, ...educationPatch(educationData) }),
  );
  return { message: 'Education added successfully' };
}

export async function updateFreelancerEducationById(educationId, educationData) {
  const user = await requireUser();
  fail(
    await supabase
      .from('educations')
      .update(educationPatch(educationData))
      .eq('id', educationId)
      .eq('profile_id', user.id),
  );
  return { message: 'Education updated successfully' };
}

export async function deleteFreelancerEducationById(educationId) {
  const user = await requireUser();
  fail(
    await supabase
      .from('educations')
      .delete()
      .eq('id', educationId)
      .eq('profile_id', user.id),
  );
  return { message: 'Education deleted successfully' };
}

export async function getFreelancerEducations() {
  const user = await requireUser();
  const { data, error } = await supabase
    .from('educations')
    .select(educationSelect)
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return { data: (data ?? []).map(mapEducation) };
}

export async function getFreelancerEducationById(educationId) {
  await requireUser();
  const { data, error } = await supabase
    .from('educations')
    .select(educationSelect)
    .eq('id', educationId)
    .maybeSingle();
  if (error) throw error;
  return { data: data ? mapEducation(data) : null };
}

// =============================================================================
// Phone/identity OTP — REMOVED (no SMS provider). Kept as no-op stubs so the
// (currently disabled) identity dialog still imports cleanly. See verify-identity.
// =============================================================================
const phoneUnsupported = async () => {
  throw new Error('Phone verification is not supported');
};
export const sendOtp = phoneUnsupported;
export const verifyOtp = phoneUnsupported;
export const updateIdentity = phoneUnsupported;
export const resendMobileCode = phoneUnsupported;
