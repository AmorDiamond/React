import React, { Component, createRef } from "react";
import { Columns,FilterFields,PageBtnList } from "./index.options";
import { observer } from "mobx-react";
import NormalTablePage from "../common/NormalTablePage";
import store from "@/stores/tablePageStore";
import SelfModel from "@/pages/views/my-normal-list/SelfModel";

@observer
class Index extends NormalTablePage {
  public Column = Columns;
  public FilterFields = FilterFields;
  public PageBtnList = PageBtnList;
  public selfModalClass = "UpdateClass";
  public ListSelfModel = <SelfModel visible={false} submit={this.submitData} close={store.closePopup} submintloading={false} />;
  constructor(props) {
    super(props);
    this.state = {
      initUrl: "/admin/tbforecastplan/searchGroupPlan",
      title: "带搜索、按钮的列表"
    };
  }
}

export default Index;
