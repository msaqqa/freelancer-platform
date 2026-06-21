import { createClient } from '@/lib/supabase/client';
import { uid } from '@/lib/helpers';

const supabase = createClient();

// Uploads a File to a Supabase Storage bucket under the current user's folder
// ("<uid>/<random>_<name>") and returns its public URL.
export async function uploadFile(file, bucket) {
  if (!file) throw new Error('No file provided');
  if (!bucket) throw new Error('No bucket specified');

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const safeName = file.name.replace(/[^\w.\-]/g, '_');
  const path = `${user.id}/${uid()}_${safeName}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

// Uploads many files, returns array of public URLs (order preserved).
export async function uploadFiles(files, bucket) {
  return Promise.all(Array.from(files).map((f) => uploadFile(f, bucket)));
}

// Deletes an object given its public URL (or storage path).
export async function deleteFile(fileUrlOrPath, bucket) {
  if (!fileUrlOrPath) return;

  let path = fileUrlOrPath;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = fileUrlOrPath.indexOf(marker);
  if (idx !== -1) {
    path = fileUrlOrPath.slice(idx + marker.length);
  }

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}
