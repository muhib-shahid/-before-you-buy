const CUSTOM_STORAGE_KEY = 'auth_data';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const projectRef = supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
const SUPABASE_STORAGE_KEY = `sb-${projectRef}-auth-token`;

export const syncSession = () => {
  const supabaseRaw = localStorage.getItem(SUPABASE_STORAGE_KEY);
  if (supabaseRaw) {
    try {
      const supabaseToken = JSON.parse(supabaseRaw);
      if (supabaseToken?.user) {
        const existing = localStorage.getItem(CUSTOM_STORAGE_KEY);
        let isAdmin = false;
        if (existing) {
          try {
            const existingData = JSON.parse(existing);
            isAdmin = existingData.isAdmin || false;
          } catch {}
        }
        const newData = {
          user: supabaseToken.user,
          isAdmin,
          access_token: supabaseToken.access_token,
          refresh_token: supabaseToken.refresh_token,
          expires_at: supabaseToken.expires_at,
        };
        localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(newData));
      } else {
        localStorage.removeItem(CUSTOM_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to parse Supabase token');
    }
  } else {
    localStorage.removeItem(CUSTOM_STORAGE_KEY);
  }
};