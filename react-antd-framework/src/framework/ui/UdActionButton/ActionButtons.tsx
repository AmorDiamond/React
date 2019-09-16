import React, { Component, ReactNode, Fragment } from "react";
import { IActionButton, IActionConfirm, IActionRoute } from "./types";
import ActionButton from "./ActionButton/ActionButton";
import { confirmActionDo, routeActionDo } from "./defaultAction";
import { isArray } from "util";
import { IPageAjaxParams } from "@/stores/tablePageStore";


export interface IBaseActionBtn<T> {
  loading: boolean;
  defaultLoadingKey?: string;
  submitData?: (params: IPageAjaxParams) => void;
  changeModal?: (any) => void;
}

export interface IGetActionBtnsParam<T> extends IBaseActionBtn<T> {
  btnlist: IActionButton<T>[];
  data: T;
  // loading: boolean;
  // defaultLoadingKey?: string;
  defaultClass?: string | string[];
  // submitData?: () => void;
  // changeModal?: (any) => void;
}
interface IGetActionBtnParam<T> {
  key?: any;
  btnInfo: IActionButton<T>;
  data: T;
  loading?: boolean;
  defaultLoadingKey?: string;
  defaultClass?: string | string[];
  submit: (any) => void;
}

/**获取按钮class */
function getBtnClass(defaultClass: string | string[] = [], btnClass: string | string[] = []) {
  let className: string[] = [];
  isArray(defaultClass) ? (className = defaultClass) : className.push(defaultClass);
  isArray(btnClass) ? (className = className.concat(btnClass)) : className.push(btnClass);
  return className;
}

/**获取单个按钮 */
export function getAcctions<T>({ btnInfo, data, defaultClass = [], submit, loading, defaultLoadingKey, key }: IGetActionBtnParam<T>) {
  /**默认方法 */
  const defaultAction: any = {
    Confirm: ({ data, action, loadingKey }: { data: any; action: IActionConfirm<T>; loadingKey: string }) => confirmActionDo<T>({ data, action, submit, loadingKey }),
    Route: ({ data, action }: { data: any; action: IActionRoute<T> }) => routeActionDo<T>({ data, action })
  };
  const btnSubmit = defaultAction[btnInfo.action.type] ? defaultAction[btnInfo.action.type] : submit;
  let className: string[] = getBtnClass(defaultClass, btnInfo.className);
  return <ActionButton className={className.join(" ")} loading={loading} loadingKey={btnInfo.loadingKey || defaultLoadingKey} data={data} submit={btnSubmit} btnInfo={btnInfo} key={key} />;
}

/**获取按钮组 */
export function GetActionButtons<T>({ btnlist, data, defaultClass, submitData, changeModal, defaultLoadingKey, loading }: IGetActionBtnsParam<T> ) {
  const list: ReactNode[] = [];
  btnlist.forEach((btnInfo, index) => {
    //let Btn = btnObjet[btnInfo.type];
    if (!btnInfo.isShow || btnInfo.isShow(data)) {
      const ModalType = ["Form", "Modal"]; //"Confirm",  "Modal",
      let submit = ModalType.indexOf(btnInfo.action.type) > -1 ? changeModal : submitData;
      submit = submit ? submit : () => {};
      list.push(getAcctions<T>({ btnInfo, data, submit, defaultClass, loading, defaultLoadingKey, key: index }));
    }
  });
  return list;
}

/**获取按钮组jsx */
export function ActionButtons<T>({ btnlist, data, submitData, changeModal, defaultLoadingKey, loading }: IGetActionBtnsParam<T>) {
  const list: ReactNode[] = [];
  btnlist.forEach((btnInfo, index) => {
    //let Btn = btnObjet[btnInfo.type];
    if (!btnInfo.isShow || btnInfo.isShow(data)) {
      const ModalType = ["Form", "Modal"]; //"Confirm",  "Modal",
      let submit = ModalType.indexOf(btnInfo.action.type) > -1 ? changeModal : submitData;
      submit = submit ? submit : () => {};
      list.push(getAcctions<T>({ btnInfo, data, submit, loading, defaultLoadingKey, key: index }));
    }
  });
  return <Fragment>{list.map(item => item)}</Fragment>;
}
