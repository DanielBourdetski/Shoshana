export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const fetchToken = () => {
  localStorage.getItem("token");
};

export default {
  saveToken,
  fetchToken,
};
