import { BASE_URL } from "@/utils/constants";
import axios from "axios";
import Cookies from "js-cookie";

const _axios = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 2 * 60 * 1000,
});

_axios.interceptors.request.use(async (config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.baseURL = `${BASE_URL}`;
  return config;
});

const { get, post, put, delete: destroy } = _axios;

export { get, post, put, destroy };
