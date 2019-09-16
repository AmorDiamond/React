import React, { lazy } from "react";
import { CommonComponent } from "./method";
import { IRouteObject, IRouteMenuObject } from "./types";

const routes: IRouteObject = {
  /*************** 商品管理(DataManagement) ***************/
  /***** 表单示例 *****/
  example_form_filter: {
    name: "example_form_filter",
    path: "/example/filter",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/Form/Filter"), props)
  },
  example_form_normal: {
    name: "example_form_normal",
    path: "/example/form/normal",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/Form/AutoForm"), props)
  },
  example_form_self: {
    name: "example_form_self",
    path: "/example/form/self",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/Form/SelfForm"), props)
  },
  /***** 表格示例 *****/
  example_table_normal: {
    name: "example_table_normal",
    path: "/example/table/filter",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/Table/BaseTable"), props)
  },
  example_table_btn: {
    name: "example_table_btn",
    path: "/example/table/btn",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/Table/ButtonTable"), props)
  },
  example_table_self: {
    name: "example_table_self",
    path: "/example/table/self",
    exact: true,
    render: (props: any) =>
      CommonComponent(
        () => import("../pages/example/Table/SelfColumnTable"),
        props
      )
  },
  example_table_edit: {
    name: "example_table_edit",
    path: "/example/table/edit",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/Table/EditTable"), props)
  },
  example_table_drag: {
    name: "example_table_drag",
    path: "/example/table/drag",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/Table/DragTable"), props)
  },
  /***** 其他插件*****/
  example_other_detail: {
    name: "example_other_detail",
    path: "/example/other/detail",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/other/Detail"), props)
  },
  example_other_drag: {
    name: "example_other_drag",
    path: "/example/other/drag",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/other/Drag"), props)
  },
  /***** 基础页面示例*****/
  example_page_smart: {
    name: "example_page_smart",
    path: "/example/page/smartFilter",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/newPage/tablePage/SmartTablePage"), props)
  },
  example_page_normal: {
    name: "example_page_normal",
    path: "/example/page/normalFilter",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/example/newPage/tablePage/NormalTablePage"), props)
  },
  example_page_mynormal: {
    name: "example_page_normal",
    path: "/example/page/myNormalList",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/views/my-normal-list"), props),
    onGradeRouteIds: ["example_page_mynormal_detail"],
  },
  example_page_mynormal_detail: {
    name: "example_page_normal_detail",
    path: "/example/page/myNormalDetail/:id",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/views/my-normal-list/detail"), props),
  },
  example_page_mysimple: {
    name: "example_page_simple",
    path: "/example/page/mySimpleList",
    exact: true,
    render: (props: any) =>
      CommonComponent(() => import("../pages/views/my-simple-list"), props),
  }
};

// let routes:={}

function getRouterAndPowerObject(): IRouteMenuObject {
  const object: IRouteMenuObject = {};
  const childrenRoutes: string[] = [];
  Object.keys(routes).forEach(key => {
    let { path, onGradeRouteIds } = routes[key];
    if (typeof path == "string" && childrenRoutes.indexOf(key) === -1) {
      path = path.replace(/\/+/g, "_");
      object[path] = key;
    }
    if (onGradeRouteIds && onGradeRouteIds.length > 0) {
      onGradeRouteIds.forEach(routesKey => {
        childrenRoutes.push(routesKey);
        let childrenPath = routes[routesKey].path;
        if (typeof childrenPath == "string") {
          childrenPath = childrenPath.split(":")[0].replace(/\/+/g, "_");
          object[childrenPath] = key;
        }
      });
    }
  });
  return object;
}

export const RoutePowerObject = getRouterAndPowerObject();

export default routes;
