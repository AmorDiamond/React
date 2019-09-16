/**
 * 通用详情页 store
 */
import { observable, action } from "mobx";
import { pageGet, pagePost } from "@/api/ajaxExtend";

interface IRequestParam {
  url: string;
  method?: "GET" | "POST";
  params?: any;
}

/** 详情页面store定义 */
class NormalPageDetail {
  @observable
  public pageData: any = {};
  /**loading状态 */
  @observable
  public loading: any = { all: false, popupInit: false, popupSubmit: false };
  @observable
  public init: boolean = true;

  /**改变登录状态 */
  @action
  public changeLoading = (key: string, value: boolean): void => {
    this.loading[key] = value;
  };

  /**获取数据获取数据 */
  @action
  public requestData = ({ url, method, params }: IRequestParam): void => {
    this.loading.all = true;
    const callback = ({ isSuccess, data }) => {
      if (isSuccess) {
        this.init = false;
        this.pageData = data || {};
      }
      this.loading.all = false;
    };
    if (method == "GET") {
      pageGet({ url, params, callback });
    } else {
      pagePost({ url, params, callback });
    }
  };
  @action
  public resetPageData = () => {
    this.pageData = {};
    this.loading = { all: false, popupInit: false, popupSubmit: false };
  };
}

/** 实例 */
const normalPageDetail = new NormalPageDetail();

export default normalPageDetail;
