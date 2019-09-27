import React, { Component, createRef } from "react";
import { Columns,FilterFields,PageBtnList } from "./index.options";
import { observer } from "mobx-react";
import NormalTablePage from "../common/NormalTablePage";
import store from "@/stores/tablePageStore";
import SelfModel from "./SelfModel";
import FormModal from "@component/Modal/FormModal";
import AddModal from "@/pages/views/extends-list/AddModal";

@observer
class Index extends NormalTablePage {
  public Column = Columns;
  public FilterFields = FilterFields;
  public PageBtnList = PageBtnList;
  public selfModalClass = "UpdateClass";
  public addModalClass = "addClass";
  constructor(props) {
    super(props);
    this.state = {
      initUrl: "/admin/tbforecastplan/searchGroupPlan",
      title: "继承的列表"
    };
  }
  render() {
    const selfModalProp = store.SelfModal[this.selfModalClass];
    const addModalProp = store.SelfModal[this.addModalClass];
    // 继承超类，重写超类的render方法，添加基类所需数据，并将超类的render方法在基类重写的render里使用，即拥有超类的数据也成功添加啦基类自己的数据
    return (
      <div>
        {super.render()}
        <SelfModel {...selfModalProp} submit={this.submitData} close={store.closePopup} submintloading={false} />
        <AddModal {...addModalProp} submit={this.submitData} close={store.closePopup} submintloading={false} />
      </div>
    )
  }
}

export default Index;
