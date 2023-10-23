const TOKEN_STORAGE_KEY = `auth-token`;

export const getAuthToken = () => {
  return JSON.parse(window.localStorage.getItem(TOKEN_STORAGE_KEY));
};

export const setAuthToken = (token) => {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  return true;
};

export const removeAuthToken = () => {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  return true;
};

export const decodeAuthToken = (token) => {
  const now = new Date().getTime() / 1000;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp && payload.exp < now) return null;
  return payload;
};

export const getAuthUser = () => {
  const token = getAuthToken();
  if (token) {
    return decodeAuthToken(token);
  }
  return null;
};

export const getAuthUserRole = () => {
  const user = getAuthUser();
  if (user) {
    return user.role;
  }
  return null;
};
