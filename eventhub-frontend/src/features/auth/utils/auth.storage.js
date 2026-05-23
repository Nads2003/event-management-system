export const saveAuth = (token, role, id) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("userId", id);
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
};

export const getAuth = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("userId");

  return token ? { token, role, id } : null;
};