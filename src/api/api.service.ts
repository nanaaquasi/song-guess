import axios from "axios";
import { logout } from "./auth.service";
import JwtService from "./jwt.service";

const token = JwtService.getItem("token");
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

const headers = () => {
  const token = JwtService.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      logout();
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);

export const dispatch = (data: any, url: string) =>
  axios.post(url, data, headers());
export const receive = (url: string) => axios.get(url, headers());
export const mutate = (data: any, url: string) =>
  axios.put(url, data, headers());
export const remove = (url: string) => axios.delete(url, headers());
