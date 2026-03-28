export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username);
};

export const validateGameTitle = (title) => {
  return title.length >= 1 && title.length <= 100;
};

export const validateReviewContent = (content) => {
  return content.length >= 10 && content.length <= 2000;
};

export const validateCommentContent = (content) => {
  return content.length >= 1 && content.length <= 500;
};

export const validateRating = (rating) => {
  return Number.isInteger(rating) && rating >= 1 && rating <= 5;
};

export const validateSlug = (slug) => {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};