import { Modal } from "antd";
import { IActionConfirm, IActionAjax, IActionRoute, ConfirmIcons } from "../types";
// import router from "../../../router";
import { getParamsByMethod, getContentByMethod } from "../method";
import { isArray } from "util";
import { withRouter } from "react-router";

interface IConfirmParams<T> {
  data: T;
  action: IActionConfirm<T>;
  submit: (data: any) => void;
  loadingKey: string;
}
/**confirmAction默认操作 */
export function confirmActionDo<T>({ data, action, submit, loadingKey }: IConfirmParams<T>) {
  Modal.confirm({
    title: getContentByMethod(data, action.content),
    icon:action.icon||ConfirmIcons.Question,
    okText: "确定",
    cancelText: "取消",
    onOk() {
      let params = {};
      params = getParamsByMethod(data, action.ajaxParams);
      let ajaxInfo: IActionAjax = action.ajaxSubmit;
      if (action.ajaxBefore) {
        ajaxInfo.ajaxUrl = action.ajaxBefore(ajaxInfo.ajaxUrl, data);
      }
      submit({ ajaxInfo, params, loadingKey });
    }
  });
}

interface IRouteParams<T> {
  data: T;
  action: IActionRoute<T>;
}

/**路由跳转路径 */
function getPath<T>(data: T, action: IActionRoute<T>) {
  let path = action.url;
  if (action.addUrlParams) {
    let urlParams: any = action.addUrlParams;
    if (typeof action.addUrlParams != "function") {
      urlParams = (data: any, url: string) => {
        let originUrl: string = url + "?";
        let addUrlParams = isArray(action.addUrlParams) ? action.addUrlParams : [action.addUrlParams];
        addUrlParams.forEach((param: any) => {
          originUrl += param + "=" + data[param];
        });
        return originUrl;
      };
    }
    path = urlParams(data, action.url);
  }
  return path;
}
/**路由跳转默认操作 */
export function routeActionDo<T>({ data, action }: IRouteParams<T>) {
  if (action) {
    let path: string = getPath<T>(data, action);
    // let path: string = urlParams(data, action.url);
    window.location.hash = path;
  }
}
