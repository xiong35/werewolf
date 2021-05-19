import axios, { AxiosRequestConfig } from "axios";

import { SERVER_BASE_URL } from "../../shared/constants";
import { showDialog } from "../reactivity/dialog";
import { getToken } from "../utils/token";

export default function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    baseURL: SERVER_BASE_URL,
    timeout: 60000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      config.headers.Token = token && token.ID;
      config.headers.RoomNumber = token && token.roomNumber;
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
        showDialog(data.msg || "不知道发生了什么呢QwQ");
        return null;
      }
    },
    (err) => {
      console.log(err);
    }
  );

  return instance(config);
}
