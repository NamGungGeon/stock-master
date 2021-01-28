import axios from "axios";
import auth from "../observables/auth";

const host = "http://125.141.133.134:898";
axios.defaults.baseURL = host;
axios.defaults.headers = {
  "Content-type": "application/json"
};

export const login = (username, password) => {
  return axios.request({
    url: `/api/token/`,
    method: "POST",
    data: {
      username,
      password
    }
  });
};

export const getThemeList = (page = 1) => {
  return axios.request({
    url: `/api/themecode/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: {
      page
    }
  });
};
export const getTheme = id => {
  return axios.request({
    url: `/api/themecode/${id}/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET"
  });
};

export const getThemeEventList = ({ name }) => {
  return axios.request({
    url: `/api/themeevent/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: { name }
  });
};

export const getThemeRelativeStockList = ({ theme }) => {
  return axios.request({
    url: `/api/themestock_rl/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: { theme }
  });
};

export const getThemeRankStockListByDate = ({ theme }) => {
  return axios.request({
    url: `/api/themestock_rh/summary_by_date/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: { theme }
  });
};
export const getThemeRankStockList = ({ theme }) => {
  return axios.request({
    url: `/api/themestock_rh/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: { theme }
  });
};
