const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const projectRef = supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
const STORAGE_KEY = `sb-${projectRef}-auth-token`;

export const getAccessToken = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    return data?.access_token || null;
  } catch {
    return null;
  }
};