import { ReactNode } from "react";
import Title from "antd/lib/skeleton/Title";
import { IUdFormFileld } from "../../UdForm/types";
import { AxiosRequestConfig } from "axios";
import { ButtonType } from "antd/lib/button";

export enum BtnIcons {
  search = "search",
  plus = "plus",
  plusCircle = "plus-circle",
  close = "close",
  delete = "delete",
  edit = "edit"
}

export interface ajaxConfig extends AxiosRequestConfig {
  /**是否需要拦截错误 */
  notHandleError: boolean;
}

/**ajax基础参数*/
export interface IActionAjax {
  successMsg?: string;
  ajaxMethod?: "POST" | "GET";
  ajaxUrl: string;
  /**ajax唯一描述 */
  ajaxId?: string;
  /**自定义ajax配置 如header设置等，使用方法与axios类似*/
  ajaxConfig?: ajaxConfig;
}

export enum ConfirmIcons {
  Question = "question-circle",
  Minus = "minus-circle",
  Exclamation = "exclamation-circle",
  Info = "info-circle",
  Close = "close-circle"
}
/**自定义Confirm弹出框按钮*/
export interface IActionConfirm<T> {
  type: "Confirm";
  icon?: ConfirmIcons;
  /**根据选中数据获取提交数据
   * string-需要提交单个键使用
   * string[]-需要提交多个键使用
   * function-需要对选中数据进行变更时使用
   */
  ajaxParams: string | string[] | ((model: T) => any);
  ajaxBefore?: (url: string, model: T) => string;
  ajaxSubmit: IActionAjax;
  /** model 操作数据*/
  content?: string | ReactNode | ((model: T) => string | ReactNode);
}
/**自定义Form弹出框按钮*/
export interface IActionForm<T> {
  type: "Form";
  modalTitle: string;
  changeModal?: (model: T) => any;
  form: IUdFormFileld[];
  init?: {
    ajaxMethod: "POST" | "GET";
    ajaxUrl: string;
    ajaxBefore?: (
      model: T
    ) => {
      data?: any;
      url?: string;
    };
  };
  /** submit.ajaxUrl不存在时， submit.ajaxBefore必须返回url*/
  submit: {
    successMsg?: string;
    /**ajaxMethod方式 默认POST */
    ajaxMethod?: "POST" | "GET";
    ajaxUrl?: string;
    ajaxId?: string;
    ajaxBefore?: (
      model: T,
      values: any
    ) => {
      data?: any;
      url?: string;
    };
  };
}
/**自定义弹出框按钮*/
export interface IActionModal<T> {
  type: "Modal";
  submitAjax?: IActionAjax;
  modalType: string;
  modalTitle?: string;
}
/**路由按钮 */
export interface IActionRoute<T> {
  type: "Route";
  url: string;
  /**
   * string，url绑定操作数据单个字段，
   * string[]，操作数据单个字段多个字段，
   * ((model: T, url: string) => string) 自定义改变url
   * */
  addUrlParams?: string | string[] | ((model: T, url: string) => string);
}

/**基础button按钮 */
export interface IActionButton<T> {
  /**title和circle必须要填写一个*/
  title?: string | ReactNode | ((model: T) => string);
  icon?: BtnIcons;
  btnType?: ButtonType;
  className?: string | string[];
  authCode?: string;
  /**显示html类型 默认为button*/
  //type?: "link" | "button";
  isShow?: (model: T) => boolean;
  actionBefore?: (model: T) => { canContinue: boolean; msg?: string };
  /**加载状态的标示，
   *ActionButtons方法也可以设置，如果该处设置，则优先使用该处
   * */
  loadingKey?: string;
  action: IActionConfirm<T> | IActionForm<T> | IActionModal<T> | IActionRoute<T>;
}
