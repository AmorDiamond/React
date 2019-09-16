import React, { Suspense, lazy, Component } from "react";
import { IRoute } from "./types";
import { Spin } from "antd";

import { Switch, Route } from "react-router";
import { Redirect } from "react-router-dom";
// import LayoutRoute from "./resource/index";
import Menus from "./routes";
import Layout from "../pages/Layout/Layout";
import Login from "../pages/Login/Login";
import NotFound from "../pages/Exception/NotFound";
import { log } from "util";
// import NotFound from "../pages/exception/NotFound";


// const Layout = lazy(() => import("../pages/Layout/Layout"));
// const Home = lazy(() => import("../pages/Home"));
// const Test = lazy(() => import("../pages/Homes"));

function addRoute(route: IRoute) {
  let { name, onGradeRouteIds = [], ...pageRoute } = route;
  //sysRoutes.push(<Route key={name} {...pageRoute} />);
  return <Route key={name} {...pageRoute} />;
}
//获取登录后的路由
export function getRoutesByMenu(systemMenu) {
  let sysRoutes: any[] = [];
  let pagetypes = ["INNER_LINK", "BLANK_LINK"];

  systemMenu.childrenKeys.forEach(key => {
    let menuInfo = systemMenu[key];
    
    if (pagetypes.indexOf(menuInfo.type) > -1 && Menus[key]) {
      let { name, onGradeRouteIds = [], ...pageRoute } = Menus[key];
      sysRoutes.push(<Route key={name} {...pageRoute} />);
      //&&menuInfo.childrenKeys&&menuInfo.childrenKeys.length>0
      if (onGradeRouteIds.length > 0) {
        onGradeRouteIds.forEach(key => {
          sysRoutes.push(addRoute(Menus[key]));
        });
      }
    }

    //获取模块子路由
    if (menuInfo.childrenKeys && menuInfo.childrenKeys.length > 0) {
      sysRoutes = sysRoutes.concat(getRoutesByMenu(menuInfo));
    }
  });

  return sysRoutes;
}
export const LoginRoute=(
  <Switch>
    <Route path='/' component={Login} excat/>
  </Switch>
);

export function getRoutes(systemInfo) {
  const sysRoutes: any[] = getRoutesByMenu(systemInfo);
  
  const routes = (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", marginTop: "44vh" }}>
          <Spin size='large' />
        </div>
      }
    >
      <Switch>
        <Route path='/' render={() => <Redirect to={sysRoutes[0].props.path} />} exact />
        {sysRoutes.map(route => route)}
        <Route path="/404" component={NotFound} replace />
        <Route path="*" render={() => <Redirect to="/404" />} />
      </Switch>
    </Suspense>
  );
  const mainRoute = (
    <Switch>
      <Route path='/' render={props => <Layout {...props}>{routes} </Layout>} />
    </Switch>
  );

  return mainRoute;
}
