import axios from "axios";
import { notification, Button } from "antd";

import appStore from "./appStore";
import manageCenter, { MessageTypes } from "./ManageCenterClient";
import ManageCenterClient from "./ManageCenterClient";
import { values } from "mobx";

let isjudeTime = true;

function judeTime() {
  if (!isjudeTime) {
    return;
  }
  const Authorization = appStore.authorization;
  if (!Authorization || !Authorization.accessTokenExpireTime) {
    return;
  }
  let endTime = new Date(Authorization.accessTokenExpireTime).getTime();
  let nowTime = new Date().getTime();
  if ((endTime - nowTime) / 1000 / 60 < 30 && (endTime - nowTime) / 1000 / 60 > 0) {
    isjudeTime = false;
    ManageCenterClient.sendMessage({ type: MessageTypes.RefreshToken }, data => {
      isjudeTime = true;
      appStore.authorization = data;
    });
  }
}

const http = axios.create({
  // baseURL: 'http://10.201.2.134:10012',
  // baseURL: "http://10.201.2.153:10012",
  // baseURL: "http://10.1.26.186:6060",
  // baseURL: appStore.service.devTest,
});

http.interceptors.request.use(
  value => {
    if (appStore.authorization && appStore.authorization.accessToken) {
      value.headers.Authorization = appStore.authorization.accessToken;
    }
    if (value.url && value.url[0] != "h") {
      value.url = appStore.service["UPC"] + value.url;
    }
    if (value.url && value.url == "/admin/tbforecastplan/searchGroupPlan") {
      value.url = appStore.service["devTest"] + value.url;
    }
    judeTime();
    value.headers["Content-Type"] = "application/json;charset=UTF-8";
    return value;
  },
  error => {
    return Promise.reject(error);
  }
);
let networkErr = false;
http.interceptors.response.use(
  res => {
    networkErr = false;
    if (res.status !== 200) {
      return Promise.reject(res);
    }

    const response = res.data;
    const config: any = res.config;
    if (response.code == 200 || response.code == 0) {
      return Promise.resolve(response.data);
    } else {
      if (response.code == 401) {
        notification["error"]({
          message: `系统消息`,
          description: "登陆超时",
          onClick: () => {
            manageCenter.sendMessage({ type: MessageTypes.LoginOut }, data => {});
          }
        });
      } else if (!config.notHandleError) {
        notification["error"]({
          message: `系统消息`,
          description: response.msg
        });
      }
      return Promise.reject(res.data);
    }
  },
  error => {
    if (!error.response) {
      if (!networkErr) {
        networkErr = true;
        notification["error"]({
          message: `系统消息`,
          description: "网络错误，请稍后重试！"
        });
      }
    } else if (error.response.status === 401) {
      notification["error"]({
        message: `系统消息`,
        description: "登陆超时",
        onClose: () => {
          manageCenter.sendMessage({ type: MessageTypes.LoginOut }, data => {});
        },
        onClick: () => {
          manageCenter.sendMessage({ type: MessageTypes.LoginOut }, data => {});
        }
      });
    } else {
      notification["error"]({
        message: `系统消息`,
        description: "系统错误，请稍后重试！"
      });
    }
    return Promise.reject(error);
  }
);

export default http;
