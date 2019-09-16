import { observable, action } from "mobx";

import http from "@/utils/http";
import { pageTablePostGet, pageGet, pagePost } from "@/api/ajaxExtend";
import { IActionForm, IActionAjax, IActionModal } from "@/framework/ui/UdActionButton/types";
import { log } from "util";
import { initTreePageData } from "@/utils";
import { IModalInfo, ISelfModalParams } from "@/stores/tablePageStore";

/** 普通页面store定义 */
class NormalPage {
  @observable
  public pageData: any[] = [];
  @observable
  public loading: any = { all: false, popupInit: false, popupSubmit: false };
  @observable
  public Modal: IModalInfo = { visible: false };
  @observable
  public SelfModal: { [propsName: string]: ISelfModalParams } = {};
  @observable
  public expandArr: string[] = [];
  @observable
  public tableSearch: any = {};
  @observable
  public filterSearch: any = {};

  /**页面数据获取 */
  @action
  public getCurrentData({ url, params = {} }: { url: string; params?: any }): void {
    let { tableSearch, filterSearch } = params;
    if (tableSearch) {
      this.tableSearch = tableSearch;
    }
    if (filterSearch) {
      this.filterSearch = filterSearch;
    }
    this.loading.all = true;
    const searchParams = { ...this.filterSearch };
    const orderTypeTranalate = { ascend: "asc", descend: "desc" };

    if (this.tableSearch.sorterKey) {
      searchParams.orderBy = this.tableSearch.sorterKey;
      searchParams.orderType = orderTypeTranalate[this.tableSearch.sortType];
    }
    //const searchParams = { page, size, conditions };

    const callback = ({ isSuccess, data }) => {
      if (isSuccess) {
        let { newArr, expandArr } = initTreePageData<any>(data, "children");
        this.expandArr = expandArr;
        this.pageData = newArr;
      }
      this.loading.all = false;
    };
    pagePost({ url, params: searchParams, callback });
  }

  /**页面数据清除 */
  @action
  public resetPageInfo(isClearAll: boolean) {
    this.pageData = [];
    this.loading = { all: false, popupInit: false, popupSubmit: false };
    if (isClearAll) {
      this.tableSearch = {};
      this.filterSearch = {};
      this.Modal = { visible: false };
    }
  }
  @action
  public changExpand = (isAdd, key) => {
    let expandArr = this.expandArr.slice();
    if (isAdd) {
      expandArr.push(key);
    } else {
      let index = expandArr.findIndex(id => id == key);
      expandArr.splice(index, 1);
    }
    this.expandArr = expandArr;
  };
  /**加载状态 */
  @action
  public changeLoading(key: string, value: boolean): void {
    this.loading[key] = value;
  }

  /**打开弹出框 */
  @action
  public setPopupInfo = ({ data, action, loadingKey }): void => {
    let popupInfo: any = { visible: true, action, model: data };
    if (action.type == "Form") {
      action = action as IActionForm<any>;
      this.Modal = popupInfo;
    } else {
      let { ...SelfModal } = this.SelfModal;
      action = action as IActionModal<any>;
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
      // this.SelfModal[type] = popupInfo;
      let { ...SelfModal } = this.SelfModal;
      SelfModal[type] = popupInfo;
      this.SelfModal = SelfModal;
    }
  };
}

/** 实例 */
const store = new NormalPage();

export default store;
