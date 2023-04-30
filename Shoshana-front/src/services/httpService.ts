import axios from "axios";

export const updateHeader = (token: string): void => {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
