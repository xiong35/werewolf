import axios, { AxiosRequestConfig } from "axios";

import { showDialog } from "../reactivity/dialog";

export default function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:3030",
    timeout: 60000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      console.log(err);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      const data = response.data ?? {};
      if (data.status === 200) {
        return data;
      } else {
        showDialog(data.msg);
        return null;
      }
    },
    (err) => {
      console.log(err);
    }
  );

  return instance(config);
}
