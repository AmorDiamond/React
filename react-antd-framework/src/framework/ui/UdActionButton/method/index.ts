import { ReactNode } from "react";

export function getClass() {}
/**根据传入对象和对象相关的键，键数组，或方法，获取需要的数据 */
export function getParamsByMethod(model: any, method: string | string[] | ((model: any) => any)) {
  let params: any = {};
  if (typeof method == "string") {
    params[method] = model[method];
  } else if (typeof method == "function") {
    params = method(model);
  } else {
    method.forEach(key => {
      params[key] = model[key];
    });
  }
  return params;
}
/**根据类型判断返回数据 */
export function getContentByMethod(modal: any, method: string | ReactNode | ((model: any) => any)): any {
  return typeof method == "function" ? (method as any)(modal) : method;
}
