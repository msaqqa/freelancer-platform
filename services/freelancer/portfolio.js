import { createClient } from '@/lib/supabase/client';
import { deleteFile, uploadFile } from '@/lib/supabase/storage';

const supabase = createClient();

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

// Shape a portfolio row for the UI (CardWork wants `image`; the edit dialog
// reads `content_blocks` / `title` / `cover_url`).
const mapPortfolio = (p) => ({
  id: p.id,
  title: p.title,
  image: p.cover_url, // full public URL
  cover_url: p.cover_url,
  description: p.description,
  content_blocks: p.content_blocks ?? [],
  images: p.images ?? [],
  created_at: p.created_at,
});

// Upload any File blocks once (dedupe by File reference so the cover, which is
// usually the first image File, isn't uploaded twice) and turn the form's
// `projectFields` into the stored shape.
const processValues = async (values) => {
  const uploaded = new Map(); // File -> public URL
  const uploadOnce = async (file) => {
    if (!(file instanceof File)) return file; // already a URL string
    if (uploaded.has(file)) return uploaded.get(file);
    const url = await uploadFile(file, 'portfolio');
    uploaded.set(file, url);
    return url;
  };

  const content_blocks = [];
  const images = [];
  for (const block of values.projectFields ?? []) {
    if (block.type === 'text') {
      if (block.value?.trim()) {
        content_blocks.push({ type: 'text', value: block.value.trim() });
      }
    } else if (block.type === 'image' && block.file) {
      const url = await uploadOnce(block.file);
      if (url) {
        content_blocks.push({ type: 'image', url });
        images.push(url);
      }
    }
  }

  let cover_url = null;
  if (values.projectCover) cover_url = await uploadOnce(values.projectCover);
  if (!cover_url) cover_url = images[0] ?? null;

  return {
    title: values.title ?? '',
    description: content_blocks.find((b) => b.type === 'text')?.value ?? null,
    content_blocks,
    images,
    cover_url,
  };
};

// add a freelancer portfolio
export async function addFreelancerPortfolio(values) {
  const user = await requireUser();
  const row = await processValues(values);
  fail(
    await supabase.from('portfolios').insert({ profile_id: user.id, ...row }),
  );
  return { message: 'Project added successfully' };
}

// update a freelancer portfolio by id
export async function updateFreelancerPortfolio(portfolioId, values) {
  const user = await requireUser();
  const row = await processValues(values);
  fail(
    await supabase
      .from('portfolios')
      .update(row)
      .eq('id', portfolioId)
      .eq('profile_id', user.id),
  );
  return { message: 'Project updated successfully' };
}

// get the list of freelancer portfolio
export async function getFreelancerPortfolios() {
  const user = await requireUser();
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return { data: (data ?? []).map(mapPortfolio) };
}

// get portfolio by id
export async function getFreelancerPortfolioById(portfolioId) {
  await requireUser();
  if (!portfolioId) return { data: null };
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('id', portfolioId)
    .maybeSingle();
  if (error) throw error;
  return { data: data ? mapPortfolio(data) : null };
}

// delete a freelancer portfolio by id (also clears its storage objects)
export async function deleteFreelancerPortfolio(portfolioId) {
  const user = await requireUser();

  const { data: row } = await supabase
    .from('portfolios')
    .select('images, cover_url')
    .eq('id', portfolioId)
    .eq('profile_id', user.id)
    .maybeSingle();

  const urls = [...(row?.images ?? []), row?.cover_url].filter(Boolean);
  await Promise.all(
    urls.map((url) => deleteFile(url, 'portfolio').catch(() => {})),
  );

  fail(
    await supabase
      .from('portfolios')
      .delete()
      .eq('id', portfolioId)
      .eq('profile_id', user.id),
  );
  return { message: 'Project deleted successfully' };
}
