import { observable, action } from "mobx";

import http from "@/utils/http";
import { pageTablePostGet, pageGet, pagePost } from "@/api/ajaxExtend";
import { IActionForm, IActionAjax, IActionModal } from "@/framework/ui/UdActionButton/types";
import { log } from "util";

export interface IModalInfo {
  visible: boolean;
  model?: any;
  // action?: IActionForm<any> | IActionModal<any>;
  action?: IActionForm<any>;
}
export interface ISelfModalParams {
  visible: boolean;
  model?: any;
  action?: IActionModal<any>;
}

/**普通表格数据 */
export interface ITableData {
  content: any[]; //内容
  current: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
}

/**页面ajax提交属性 */
export interface IPageAjaxParams {
  ajaxInfo: IActionAjax;
  params?: any;
  callback?: (params: any) => void;
  loadingKey: string;
}

/**提页面初始化属性 */
export interface ITablePageInitAttr {
  initUrl: string;
  store: any;
}

/** 普通页面store定义 */
export class tablePageStore {
  @observable
  public pageData: ITableData = { content: [], current: 1, pageSize: 10, totalCount: 0, totalPage: 1 };
  @observable
  public loading: any = { all: false, popupInit: false, popupSubmit: false, other: false };
  @observable
  public Modal: IModalInfo = { visible: false };
  @observable
  public isExpand: boolean = false;
  @observable
  public SelfModal: { [propsName: string]: ISelfModalParams } = {};
  @observable
  public tableSelectKeys: string[] = [];
  @observable
  public tableSearch: any = { page: 1, size: 10 };
  @observable
  public filterSearch: any = {};

  /**页面数据获取 */
  @action
  public getCurrentData({ url, params = {} }: { url: string; params?: any }): void {
    let { tableSearch, filterSearch } = params;
    if (filterSearch) {
      this.filterSearch = filterSearch;
      this.tableSearch.page = 1;
      // this.tableSearch.size = 10;
    }
    if (tableSearch) {
      this.tableSearch = tableSearch;
    }
    this.loading.all = true;

    const { page, size, ...otherParams } = this.tableSearch;
    const conditions = { ...this.filterSearch };
    const orderTypeTranalate = { ascend: "asc", descend: "desc" };
    if (otherParams) {
      conditions.orderBy = otherParams.sorterKey;
      conditions.orderType = orderTypeTranalate[otherParams.sortType];
    }

    const searchParams = { page, size, conditions };

    const callback = ({ isSuccess, data }) => {
      if (isSuccess) {
        this.pageData = data;
      }
      this.loading.all = false;
    };
    pageTablePostGet({ url, params: searchParams, callback });
  }

  /**页面数据清除 */
  @action
  public resetPageInfo = (isClearAll: boolean) => {
    this.pageData = { content: [], current: 1, pageSize: 10, totalCount: 0, totalPage: 1 };
    this.loading = { all: false, popupInit: false, popupSubmit: false, other: false };

    if (isClearAll) {
      this.tableSearch = { page: 1, size: 10 };
      this.filterSearch = {};
      this.Modal = { visible: false };
      this.SelfModal = {};
    }
  };

  /**页面选中数据*/
  @action
  public changeSelectKeys = selectkeys => {
    this.tableSelectKeys = selectkeys;
  };

  /**加载状态 */
  @action
  public changeLoading(key: string, value: boolean): void {
    this.loading[key] = value;
  }

  /**打开弹出框 */
  @action
  public setPopupInfo = ({ data, action, loadingKey }): void => {
    debugger
    let popupInfo: any = { visible: true, action, model: data };
    if (action.type == "Form") {
      this.Modal = popupInfo;
    } else {
      let { ...SelfModal } = this.SelfModal;
      SelfModal[action.modalType] = popupInfo;
      this.SelfModal = SelfModal;
    }
  };

  /**关闭弹出框 */
  @action
  public closePopup = (type: string): void => {
    let popupInfo: any = { visible: false };
    if (type == "Form") {
      this.Modal = popupInfo;
    } else {
      let { ...SelfModal } = this.SelfModal;
      SelfModal[type] = popupInfo;
      this.SelfModal = SelfModal;
    }
  };
  /**关闭弹出框 */
  @action
  public changeExpand = (isExpand: boolean) => {
    this.isExpand = isExpand;
  };
}

/** 实例 */
const store = new tablePageStore();

export default store;
