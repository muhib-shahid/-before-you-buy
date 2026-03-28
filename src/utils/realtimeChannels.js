export const COMMENT_CHANNEL = (gameId) => `comments:game_id=eq.${gameId}`;
export const NOTIFICATION_CHANNEL = (userId) => `notifications:user_id=eq.${userId}`;
export const PRESENCE_CHANNEL = (gameId) => `game-${gameId}`;

export const CHANNEL_EVENTS = {
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  PRESENCE_SYNC: 'presence',
  PRESENCE_DIFF: 'presence_diff'
};

export const PRESENCE_CONFIG = {
  key: 'user_id',
  timeout: 30000
};