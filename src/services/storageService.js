import { supabase } from './supabaseClient';

export const uploadGameCover = async (file, gameId) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${gameId}-${Date.now()}.${fileExt}`;
    const filePath = `game-covers/${fileName}`;

    const { error } = await supabase.storage
      .from('game-covers')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('game-covers')
      .getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  } catch (error) {
    return { url: null, error: error.message };
  }
};

export const uploadUserAvatar = async (file, userId) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  } catch (error) {
    return { url: null, error: error.message };
  }
};