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

export const getThemeList = ({ page = 1, name }) => {
  return axios.request({
    url: `/api/themecode/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: {
      page,
      name
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

export const getThemeRelativeEventList = ({ theme }) => {
  return axios.request({
    url: `/api/themeevent_rl/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: { theme }
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

export const getStockList = ({ code, name, page }) => {
  return axios.request({
    url: `/api/stockcode/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: { code, name, page }
  });
};
export const getStock = id => {
  return axios.request({
    url: `/api/stockcode/${id}`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET"
  });
};

export const getStockHistory = ({ stock, page }) => {
  return axios.request({
    url: `/api/special_shl/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: {
      stock,
      page
    }
  });
};

export const getThemeRelativeStock = ({ stock, page }) => {
  return axios.request({
    url: `/api/themestock_rl/`,
    headers: {
      Authorization: `Bearer ${auth.access}`
    },
    method: "GET",
    params: {
      stock,
      page
    }
  });
};
export const getAxiosResult = axiosPromise => {
  return axiosPromise.then(res => res.data).catch(e => e);
};
