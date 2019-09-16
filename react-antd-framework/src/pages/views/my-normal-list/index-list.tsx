import React, { Component, createRef } from "react";
import {  RouteComponentProps } from "react-router";

import { Columns,FilterFields,PageBtnList } from "./index.options";
import UdForm from "@/framework/ui/UdForm/UdNormalForm";
import NormalTable from "@/framework/component/UdTable/normalTable";
import { testPageData } from "../data";
import FormModal from "@/framework/component/Modal/FormModal";
import store from "@/stores/tablePageStore";
import { observer } from "mobx-react";
import SelfModel from "./SelfModel";
import NormalFilter from "@ui/UdForm/UdFilterForm/NormalFilter";

@observer
class Index extends Component<RouteComponentProps, { data: any }> {
  public form;
  public initUrl = "";
  constructor(props) {
    super(props);
    this.form = createRef();
    this.state = {
      data: {}
    };
  }
  public submitData = data => {
    this.setState({ data });
  };
  public changeSearch = (e) => {
    console.log(e)
    const {filterSearch} = e;
    // 因为在请求服务端列表数据会先给tableSearch赋初始值，会影响全局使用到它的地方，所以这里使用浅拷贝取出来，避免值改变失败
    const tableSearch = {...store.tableSearch};
    tableSearch.page = 1;
    const params = {filterSearch};
    debugger;
    this.getTabelData(params);
  };
  public tableSearchChange = (e)=>{
    const {tableSearch} = e;
    const {filterSearch} = store;
    const params = {filterSearch,tableSearch};
    this.getTabelData(params);
  };
  public handleSubmit = () => {
    this.form.current.setFieldsValue({ title: 224 });
  };
  public getTabelData = ({filterSearch,tableSearch=null})=>{
    store.getCurrentData({url:this.initUrl,params:{filterSearch,tableSearch}});
  };

  render() {
    const {
      pageData,
      tableSearch,
      filterSearch,
      loading: { all, popupSubmit, other }
    } = store;
    let loading = true;
    const { UpdateClass = { visible: false } } = store.SelfModal;
    return (
      <div className='page'>
        <div className='page-title'>
          <h3>带搜索、按钮的列表</h3>
        </div>
        <div className='page-filter'>
          <NormalFilter
            isExpand={store.isExpand}
            changeExpand={store.changeExpand}
            fields={FilterFields}
            submit={this.changeSearch}
            values={filterSearch}
            count={6}
            pageBtnList={PageBtnList}
            changeModal={store.setPopupInfo}
          />
        </div>
        {/*<div className='page-panel'>*/}
        <div className='page-table'>
          <NormalTable changeModal={store.setPopupInfo} columns={Columns} pageData={testPageData} changeSearch={this.tableSearchChange} loading={false} />
          <FormModal {...store.Modal} submit={this.submitData} close={store.closePopup} submintloading={false} />
          <SelfModel {...UpdateClass} submit={this.submitData} close={store.closePopup} submintloading={false} />
        </div>
      </div>
    );
  }
}

export default Index;
