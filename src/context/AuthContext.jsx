import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const STORAGE_KEY = 'auth_data';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const projectRef = supabaseUrl?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
const SUPABASE_STORAGE_KEY = `sb-${projectRef}-auth-token`;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch admin status directly from the database
  const fetchAdminStatus = async (userId) => {
    if (!userId) return false;
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();
    if (error) {
      console.error('Error fetching admin status:', error);
      return false;
    }
    return data?.is_admin || false;
  };

  // Effect to update admin status whenever user changes
  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    let isMounted = true;
    fetchAdminStatus(user.id).then(admin => {
      if (isMounted) setIsAdmin(admin);
    });
    return () => { isMounted = false; };
  }, [user]);

  // 1. Load from custom storage instantly
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        if (data.user) {
          setUser(data.user);
          // isAdmin will be fetched by the effect above
        }
      } catch (e) {
        console.warn('Invalid stored auth data');
      }
    }
    setLoading(false);
  }, []);

  // 2. Sync with Supabase token (runs once on mount, then periodically)
  useEffect(() => {
    let isMounted = true;
    let intervalId = null;

    const sync = async () => {
      const supabaseRaw = localStorage.getItem(SUPABASE_STORAGE_KEY);
      if (supabaseRaw) {
        try {
          const supabaseToken = JSON.parse(supabaseRaw);
          if (supabaseToken?.user) {
            // Update custom storage with token (without isAdmin)
            const newData = {
              user: supabaseToken.user,
              access_token: supabaseToken.access_token,
              refresh_token: supabaseToken.refresh_token,
              expires_at: supabaseToken.expires_at,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
            if (isMounted) {
              setUser(supabaseToken.user);
            }
          } else {
            localStorage.removeItem(STORAGE_KEY);
            if (isMounted) setUser(null);
          }
        } catch (e) {
          console.warn('Failed to parse Supabase token');
        }
      } else {
        localStorage.removeItem(STORAGE_KEY);
        if (isMounted) setUser(null);
      }
    };

    sync();
    intervalId = setInterval(sync, 30 * 1000);
    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // 3. Listen to auth state changes (login / logout)
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            user: session.user,
            access_token: session.access_token,
            refresh_token: session.refresh_token,
            expires_at: session.expires_at,
          })
        );
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      }
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const value = { user, loading, isAdmin };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};