﻿import type {RequestOptions} from '@@/plugin-request/request';
import type {RequestConfig} from '@umijs/max';
import {message} from 'antd';
import {history} from "@@/core/history";
import {LOGIN_PATH, NO_NEED_LOGIN_WHITE_LIST} from "@/constants";

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: process.env.NODE_ENV === "production" ? "https://duck-api-backend.hundunya.cn" : "http://localhost:8101",
  // baseURL: process.env.NODE_ENV === "production" ? "https://e697-222-210-19-65.ngrok-free.app" : "http://localhost:8101",
  withCredentials: true,

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      // const url = config?.url?.concat('?token = 123');
      // config?.headers?.putCookie("")
      return {
        ...config,
        headers: {
          "token": sessionStorage.getItem("token")
        },
        getResponse: true
      };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;

      if(data && data.code === 0){
        return response;
      }

      let pathname = history.location.pathname;
      if (pathname !== "/" && pathname.endsWith("/")) {
        pathname = pathname.substring(0, pathname.length - 1);
      }

      if (data?.code === 40100){
        if (NO_NEED_LOGIN_WHITE_LIST.includes(pathname)){
          return response;
        }
        history.push(LOGIN_PATH);
      }

      if (data?.code !== 0) {
        message.error(data.message);
      }
      return response;
    },
  ],
};
