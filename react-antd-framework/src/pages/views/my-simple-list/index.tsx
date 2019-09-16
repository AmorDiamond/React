import React, {Component} from 'react';
import SmartFilter from '@/framework/ui/UdForm/UdFilterForm/SmartFilter';
import {Columns, FilterFields, PageBtnList} from "./index.options";
import {GetActionButtons} from "@ui/UdActionButton/ActionButtons";
import NormalTable from "@component/UdTable/normalTable";
import store from "@/stores/tablePageStore";
import { testPageData } from "../data";

class Index extends Component {
  public initUrl = "";
  public submitData = ()=>{};

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
    return (
      <div className='page'>
        <div className='page-title'>
          <h3>带搜索、简单的列表</h3>
        </div>
        <div className='page-filter'>
          <SmartFilter btnLeftSpace={85} submit={this.submitData} fields={FilterFields} values={{}} />
        </div>
        <div className='page-table'>
          <div className='table-operate'>{GetActionButtons<any>({ btnlist: PageBtnList, data: {}, loading: false })}</div>
          <NormalTable
            submitData={this.submitData}
            columns={Columns}
            pageData={testPageData}
            loading={all}
            defaultLoadingKey={"all"}
            changeSearch={this.tableSearchChange}
            sortKey={tableSearch.sortKey}
            sortType={tableSearch.sortType}
            changeModal={store.setPopupInfo}
          />
        </div>
      </div>
    );
  }
}

export default Index;