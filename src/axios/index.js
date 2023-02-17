// import axios from "axios";
// import { getLocalToken } from "@/axios/storage";
// import { API_URL } from "../constants";
// import { clearToken } from "../helpers";

// const instance = axios.create({
//   baseURL: API_URL,
//   timeout: 100000,
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": API_URL,
//   },
// });

// instance.interceptors.request.use((res) => {
//   let token = getLocalToken();
//   if (token) {
//     res.headers.Authorization = "Bearer " + token;
//   }
//   return res;
// });

// instance.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.status === 401) {
//       clearToken();
//       this.$router.push({ name: "Login" });
//     }
//   }
// );
// export default instance;

import axios from "axios";
import {
  getLocalToken,
  getLocalRefreshToken,
  setLocalToken,
} from "@/axios/storage";
import { API_URL } from "../constants";
import { clearToken } from "../helpers";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": API_URL,
  },
});

instance.interceptors.request.use((res) => {
  let token = getLocalToken();
  if (token) {
    res.headers.Authorization = "Bearer " + token;
  }
  return res;
});

instance.setToken = (token) => {
  instance.defaults.headers["Authorization"] = "Bearer " + token;
  setLocalToken(token);
};

function refreshToken() {
  if (getLocalRefreshToken()) {
    return instance.post("auth/refresh", {
      refreshToken: getLocalRefreshToken(),
    });
  }
  return null;
}
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 401 && getLocalRefreshToken()) {
      return refreshToken()
        ?.then((rs) => {
          instance.setToken(rs.data.accessToken);
          const config = res.config;
          config.headers["Authorization"] = "Bearer " + rs.data.accessToken;
          return instance(config);
        })
        ?.catch(console.log);
    }
    return res;
  },
  (err) => {
    if (err.status === 401) {
      clearToken();
      this.$router.push({ name: "Login" });
    }
  }
);

export default instance;
