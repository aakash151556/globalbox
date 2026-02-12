let memoryToken = null;

export const setToken = (token) => {
  memoryToken = token;

  try {
    sessionStorage.setItem("jwt", token);
  } catch (e) {}

  try {
    sessionStorage.setItem("jwt", token);
  } catch (e) {}
};

export const getToken = () => {
  return (
    memoryToken ||
    sessionStorage.getItem("jwt") ||
    sessionStorage.getItem("jwt")
  );
};

export const clearToken = () => {
  memoryToken = null;
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("jwt");
};
