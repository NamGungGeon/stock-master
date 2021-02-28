import axios from "axios";

const host = "http://125.141.133.134:898";

export const getAxiosResult = axiosPromise => {
  return axiosPromise.then(res => res.data).catch(e => e);
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
export const verifyToken = access => {
  return axios.request({
    url: `/api/token/verify/`,
    method: "POST",
    data: {
      token: access
    }
  });
};
export const refreshToken = refresh => {
  return axios.request({
    url: `/api/token/refresh/`,
    method: "POST",
    data: {
      refresh: refresh
    }
  });
};

const ApiRequest = function(nestedAuth) {
  this.updateAuth(nestedAuth);
};
ApiRequest.prototype.updateAuth = function(nestedAuth) {
  const { access, refresh } = nestedAuth;
  this.axios = axios.create({
    baseURL: host,
    timeout: 1000,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access}`
    }
  });
};
ApiRequest.prototype.getThemeList = function({ page = 1, name }) {
  return this.axios.request({
    url: `/api/themecode/`,
    method: "GET",
    params: {
      page,
      name
    }
  });
};
ApiRequest.prototype.getTheme = function(id) {
  return this.axios.request({
    url: `/api/themecode/${id}/`,
    method: "GET"
  });
};
ApiRequest.prototype.getThemeRelativeEventList = function({ theme }) {
  return this.axios.request({
    url: `/api/themeevent_rl/`,
    method: "GET",
    params: {}
  });
};
ApiRequest.prototype.getThemeEventList = function({
  page,
  name,
  target_date,
  target_end_date
}) {
  console.log("this", this);
  return this.axios.request({
    url: `/api/themeevent/`,
    method: "GET",
    params: { page, name, target_date, target_end_date }
  });
};
ApiRequest.prototype.getThemeRelativeStockList = function({ theme }) {
  return this.axios.request({
    url: `/api/themestock_rl/`,
    method: "GET",
    params: { theme }
  });
};
ApiRequest.prototype.getThemeRankStockListByDate = function({ theme }) {
  return this.axios.request({
    url: `/api/themestock_rh/summary_by_date/`,
    method: "GET",
    params: { theme }
  });
};
ApiRequest.prototype.getThemeRankStockList = function({ theme }) {
  return this.axios.request({
    url: `/api/themestock_rh/`,
    method: "GET",
    params: { theme }
  });
};
ApiRequest.prototype.getStockList = function({ code, name, page }) {
  return this.axios.request({
    url: `/api/stockcode/`,
    method: "GET",
    params: { code, name, page }
  });
};
ApiRequest.prototype.getStock = function(id) {
  return this.axios.request({
    url: `/api/stockcode/${id}`,
    method: "GET"
  });
};
ApiRequest.prototype.getStockHistory = function({ stock, page }) {
  return this.axios.request({
    url: `/api/special_shl/`,
    method: "GET",
    params: {
      stock,
      page
    }
  });
};
ApiRequest.prototype.getThemeRelativeStock = function({ stock, page }) {
  return this.axios.request({
    url: `/api/themestock_rl/`,
    method: "GET",
    params: {
      stock,
      page
    }
  });
};
ApiRequest.prototype.getStockEventList = function({
  name,
  target_date,
  target_end_date,
  page = 1
}) {
  return this.axios.request({
    url: `/api/stockevent/`,
    method: "GET",
    params: {
      name,
      target_date,
      target_end_date,
      page
    }
  });
};
ApiRequest.prototype.getStockRelativeEvent = function({
  stock,
  event,
  page = 1
}) {
  return this.axios.request({
    url: `/api/stockevent_rl/`,
    method: "GET",
    params: {
      stock,
      page
    }
  });
};

export default ApiRequest;
