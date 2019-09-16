import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import SmartFilter from "@/framework/ui/UdForm/UdFilterForm/SmartFilter";
import NormalTable from "@component/UdTable/normalTable";
import { GetActionButtons } from "@/framework/ui/UdActionButton/ActionButtons";
import store, { IPageAjaxParams } from "@/stores/tablePageStore";
import { bttonSubmit } from "@/api/ajaxExtend";
import { RouteComponentProps } from "react-router";
import { IUdFormFileld } from "@/framework/ui/UdForm/types";
import { IActionButton } from "@/framework/ui/UdActionButton/types";
import { TableColumn } from "@/framework/component/UdTable/types";

export interface ITablePageState {
  title: string;
  initUrl: string;
}

export class NormalTablePage<T = any, P extends RouteComponentProps = RouteComponentProps, S extends ITablePageState = ITablePageState> extends Component<P, S> {
  protected FilterFields: IUdFormFileld[] = [];
  protected PageBtnList: IActionButton<T>[] = [];
  protected Column: TableColumn<T>[] = [];

  constructor(props) {
    super(props);
  }

  public componentDidMount = () => {
    const state = this.props.location.state;
    console.info(3);
    store.resetPageInfo(state && state.refresh);
    store.getCurrentData({ url: this.state.initUrl });
  };

  /** 检索条件发生变化 */
  public changeSearch = ({ tableSearch, filterSearch }: { tableSearch?: any; filterSearch?: any }) => {
    const params = { tableSearch, filterSearch };
    store.getCurrentData({ url: this.state.initUrl, params });
  };

  /** 按钮提交时触发 */
  public submitData = (btnAjax: IPageAjaxParams) => {
    const callback = ({ isSuccess, data }) => {
      store.changeLoading(btnAjax.loadingKey, false);
      this.changeSearch({});
      if (btnAjax.callback) {
        btnAjax.callback({ isSuccess, data });
      }
    };
    bttonSubmit(btnAjax, store, callback);
  };

  render() {
    const {
      pageData,
      tableSearch,
      filterSearch,
      loading: { all, popupSubmit, other }
    } = store;
    const { title } = this.state;

    return (
      <div className='page'>
        <div className='page-title'>
          <h3>{title}</h3>
        </div>
        <div className='page-filter'>
          <SmartFilter fields={this.FilterFields} submit={this.changeSearch} values={filterSearch} />
        </div>
        <div className='page-table'>
          <div className='table-operate'>{GetActionButtons<any>({ btnlist: this.PageBtnList, data: {}, loading: false })}</div>
          <NormalTable<T>
            submitData={this.submitData}
            columns={this.Column}
            pageData={pageData}
            loading={all}
            defaultLoadingKey={"all"}
            changeSearch={this.changeSearch}
            sortKey={tableSearch.sortKey}
            sortType={tableSearch.sortType}
            changeModal={store.setPopupInfo}
          />
        </div>
      </div>
    );
  }
}

export default NormalTablePage;
