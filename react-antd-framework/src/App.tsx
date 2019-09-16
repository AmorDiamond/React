import React, { Suspense } from "react";
import { getRoutes } from "./routes/index";
import { HashRouter } from "react-router-dom";

import { Provider } from "mobx-react";

import { hot } from "react-hot-loader/root";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

import "./styles/style.less";
// import '@ud/antd-theme/dist/main.css'
import appStore from "./utils/appStore";

function App() {
  const mainRoute = getRoutes(appStore.menus);
  return (
    <LocaleProvider locale={zh_CN}>
      <Provider>
        <HashRouter>{mainRoute}</HashRouter>
      </Provider>
    </LocaleProvider>
  );
}

export default (process.env.NODE_ENV === "development" ? hot(App) : App);
