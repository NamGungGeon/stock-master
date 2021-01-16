import axios from "axios";

const host = "http://125.141.133.134:898";
axios.defaults.baseURL = host;
axios.defaults.headers = {
  "Content-type": "application/json",
};

export const login = (username, password) => {
  return axios.request({
    url: `/api/token/`,
    method: "POST",
    data: {
      username,
      password,
    },
  });
};
