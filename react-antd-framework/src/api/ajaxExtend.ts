import { notification } from "antd";
import qs from "qs";
import http from "../utils/http";
import appStore from "../utils/appStore";
import { IPageAjaxParams } from "@/stores/tablePageStore";
import { ajaxConfig } from "@/framework/ui/UdActionButton/types";

interface ISubmitAttr {
  url: string;
  successMessage?: string;
  params?: any;
  callback?: any;
  ajaxConfig?: ajaxConfig;
}

function ajaxHandle(ajaxMethod, successMessage, callback): any {
  ajaxMethod
    .then(res => {
      if (successMessage != null && successMessage != "") {
        notification.success({
          message: `系统消息`,
          description: successMessage
        });
      }

      if (callback) {
        callback({ isSuccess: true, data: res });
        callback = null;
      }
    })
    .catch(res => {
      if (callback) {
        callback({ isSuccess: false, data: res });
        callback = null;
      }
    });
}
/*** 请求数据*/
export function pageTablePostGet({ url, params, callback }) {
  http
    .post(url, params)
    .then((res: any) => {
      const { number, size, content = [], totalElements = 0 } = res;
      // 处理删除数据
      if (content.length == 0 && number > 1) {
        params.page = Math.ceil(totalElements / size);
        pageTablePostGet({ url, params, callback });
      } else {
        const data = { current: number, pageSize: size, content, totalCount: totalElements };
        callback({ isSuccess: true, data });
      }
    })
    .catch(res => {
      callback({ isSuccess: false });
    });
}

/**get方式提交数据 */
export function pageGet({ url, successMessage, params, callback, ajaxConfig }: ISubmitAttr) {
  if (params) {
    url = url + "?" + qs.stringify(params);
  }
  let options: any = ajaxConfig;
  const ajaxMethod = http.get(url, options);
  ajaxHandle(ajaxMethod, successMessage, callback);
}

/**post方式提交数据 */
export function pagePost({ url, successMessage, params, callback, ajaxConfig }: ISubmitAttr) {
  let options: any = ajaxConfig;
  const ajaxMethod = http.post(url, params, options);
  ajaxHandle(ajaxMethod, successMessage, callback);
}

/**导出文件 */
export function downLoadFile({ url, params, authParams, callback }) {
  let authUrl = appStore.service["uaa"] + "/my/getTokenByCustomId";

  const getAuthCallBack = ({ isSuccess, data }) => {
    callback({ isSuccess, data });
    if (isSuccess) {
      params.otp = data;
      let str = qs.stringify(params);
      let loadUrl = appStore.service["example"] + url + "?" + str;
      window.open(loadUrl);
    }
  };
  //获取下载权限字段
  //authParams:appCode-系统关键字， customId-下载接口权限字段
  pagePost({ url: authUrl, params: authParams, callback: getAuthCallBack });
}
/** 按钮提交时促发 */
export function bttonSubmit({ ajaxInfo, params, loadingKey }: IPageAjaxParams, store: any, callback: any) {
  store.changeLoading(loadingKey, true);

  if (ajaxInfo.ajaxMethod == "GET") {
    pageGet({ url: ajaxInfo.ajaxUrl, ajaxConfig: ajaxInfo.ajaxConfig, successMessage: ajaxInfo.successMsg, params, callback });
  } else {
    pagePost({ url: ajaxInfo.ajaxUrl, ajaxConfig: ajaxInfo.ajaxConfig, successMessage: ajaxInfo.successMsg, params, callback });
  }
}
