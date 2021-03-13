import axios from "axios";
import JwtService from "./jwt.service";

const headers = () => {
  const token = JwtService.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const dispatch = (data: any, url: string) =>
  axios.post(url, data, headers());
export const receive = (url: string) => axios.get(url, headers());
export const mutate = (data: any, url: string) =>
  axios.put(url, data, headers());
export const remove = (url: string) => axios.delete(url, headers());
