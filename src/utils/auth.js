// src/utils/auth.js

export const requireLoginWithRedirect = (navigate, redirectPath, user) => {
  if (!user || !user.token) {
    navigate("/login", { state: { from: redirectPath } });
    return false;
  }
  return true;
};
