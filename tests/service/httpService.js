const axios = require("axios");
const config = require("config");

axios.defaults.baseURL = config.get("url");
axios.defaults.headers.common["Authorization"] = config.get("auth");

axios.interceptors.response.use(null, error => {
  return Promise.reject(error.response);
});

module.exports = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
