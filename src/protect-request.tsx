
import { getCookie, setCookie } from "./coockie";
import { request } from './request';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};


const updateToken = () => {
  return request(`/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
};

export const refreshFetch = async (endpoint: string, options: RequestOptions = {}) => {
  try {
    options.headers = options.headers || {};

    return await request(endpoint, options);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await updateToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie("refreshToken", refreshData.refreshToken);
      setCookie("token", refreshData.accessToken.split("Bearer ")[1]);

      if (!options.headers) {
        options.headers = {};
      }

      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};
