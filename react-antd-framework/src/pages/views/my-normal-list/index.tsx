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
  constructor(props) {
    super(props);
    this.state = {
      initUrl: "/admin/tbforecastplan/searchGroupPlan",
      title: "带搜索、按钮的列表"
    };
  }
  render() {
    const selfModalProp = store.SelfModal[this.selfModalClass];
    // 继承超类，重写超类的render方法，添加子类所需功能，并将超类的render方法在子类重写的render里使用，即拥有超类的功能也成功添加啦子类自己的功能
    return (
      <div>
        {super.render()}
        <SelfModel {...selfModalProp} submit={this.submitData} close={store.closePopup} submintloading={false} />
      </div>
    )
  }
}

export default Index;
