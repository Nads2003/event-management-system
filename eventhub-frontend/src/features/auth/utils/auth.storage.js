export const saveAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const getAuth = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return token ? { token, role } : null;
};