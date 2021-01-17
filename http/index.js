import axios from "axios";
import auth from "../observables/auth";

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

export const getThemeList = (page = 1) => {
  console.log(`Bearer ${auth.access}`);
  return axios.request({
    url: `/api/themecode/`,
    headers: {
      Authorization: `Bearer ${auth.access}`,
    },
    method: "GET",
    params: {
      page,
    },
  });
};
