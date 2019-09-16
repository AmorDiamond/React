import React, { Component, createRef } from "react";
import {  RouteComponentProps } from "react-router";

import { Columns } from "./index.options";
import UdForm from "@/framework/ui/UdForm/UdNormalForm";
import NormalTable from "@/framework/component/UdTable/normalTable";
import { testPageData } from "../data";
import FormModal from "@/framework/component/Modal/FormModal";
import store from "@/stores/tablePageStore";
import { observer } from "mobx-react";
import SelfModel from "./SelfModel";

@observer
class LogList extends Component<RouteComponentProps, { data: any }> {
  public form;
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
  public changeSearch = () => {
    debugger;
  };
  public handleSubmit = () => {
    this.form.current.setFieldsValue({ title: 224 });
  };

  render() {
    let loading = true;
    const { UpdateClass = { visible: false } } = store.SelfModal;
    return (
      <div className='page'>
        <div className='page-title'>带按钮的列表</div>
        <div className='page-panel'>
          <NormalTable changeModal={store.setPopupInfo} columns={Columns} pageData={testPageData} changeSearch={this.changeSearch} loading={false} />
          <FormModal {...store.Modal} submit={this.submitData} close={store.closePopup} submintloading={false} />
          <SelfModel {...UpdateClass} submit={this.submitData} close={store.closePopup} submintloading={false} />
        </div>
      </div>
    );
  }
}

export default LogList;
