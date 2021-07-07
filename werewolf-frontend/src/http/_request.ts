import axios, { AxiosRequestConfig } from "axios";

import { IDHeaderName, RoomNumberHeaderName, SERVER_BASE_URL } from "../../shared/constants";
import { HttpRes } from "../../shared/httpMsg/_httpResTemplate";
import { showDialog } from "../reactivity/dialog";
import { getToken } from "../utils/token";

export default function request<T = {}>(
  config: AxiosRequestConfig
) {
  const instance = axios.create({
    baseURL: SERVER_BASE_URL,
    timeout: 60000,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      config.headers[IDHeaderName] = token && token.ID;
      config.headers[RoomNumberHeaderName] =
        token && token.roomNumber;
      return config;
    },
    (err) => {
      console.error(err);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      const data = response.data || {};
      if (data.status === 200) {
        return data;
      } else {
        if (data.msg) {
          showDialog(data.msg);
        } else {
          console.error("# e", { response });
          showDialog("不知道发生了什么呢QwQ");
        }
        return null;
      }
    },
    (err) => {
      console.error(err);
    }
  );

  return new Promise<HttpRes<T>>(async (resolve) => {
    const res = await instance(config);
    resolve((res as unknown) as HttpRes<T>);
  });
}
