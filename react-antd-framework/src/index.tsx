import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import LoginApp from "./LoginApp";

import appStore, { IAppStore } from "./utils/appStore";
import ManageCenterClient, { MessageTypes } from "./utils/ManageCenterClient";
import { getSystemMenu } from "./utils";
import "babel-polyfill";
import { loginInfo } from "@/utils/login";


function startApp() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

if (!appStore.menus) {
  const systemInfo = sessionStorage.getItem("systemInfo");
  //开发环境开放登陆
  // if (process.env.NODE_ENV == "development" && !process.env.REACT_APP_TYPE && !data.systemInfo) {
  if (process.env.NODE_ENV == "development" && !process.env.REACT_APP_TYPE && !systemInfo) {
    ReactDOM.render(<LoginApp />, document.getElementById("root"));
  } else {

    let {
      generalMenus, profile, urls ,
      Authorization
    } = loginInfo;
    let SystemMenu: any = generalMenus.find(item => item.customId == "example");

    const { menus, menuPerimissions, perimissions } = getSystemMenu([SystemMenu], "example");

    let info: IAppStore = { menus, perimissions, menuPerimissions, authorization: Authorization, userInfo: profile, service: urls };

    appStore.init(info);
    startApp();
  }
  /*ManageCenterClient.sendMessage({ type: MessageTypes.GetOriginLoginInfo }, data => {
    //开发环境开放登陆
    if (process.env.NODE_ENV == "development" && !process.env.REACT_APP_TYPE && !data.systemInfo) {
      ReactDOM.render(<LoginApp />, document.getElementById("root"));
      return;
    }

    let {
      systemInfo: { generalMenus, profile, urls },
      Authorization
    } = loginInfo;
    let SystemMenu: any = generalMenus.find(item => item.customId == "example");

    const { menus, menuPerimissions, perimissions } = getSystemMenu([SystemMenu], "example");
    
    let info: IAppStore = { menus, perimissions, menuPerimissions, authorization: Authorization, userInfo: profile, service: urls };

    appStore.init(info);
    startApp();
  });*/
} else {
  startApp();
}
