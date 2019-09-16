import React, { Component, createRef } from "react";
import {  RouteComponentProps } from "react-router";

import { Columns } from "./index.options";
import UdForm from "@/framework/ui/UdForm/UdNormalForm";
import NormalTable from "@/framework/component/UdTable/normalTable";
import { testPageData } from "../data";
import { observer } from "mobx-react";

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
    let data = {};
    let loading = true;

    return (
      <div className='page'>
        <div className='page-title'>自定义列</div>
        <div className='page-panel'>
          <NormalTable columns={Columns} pageData={testPageData} changeSearch={this.changeSearch} loading={false} />
        </div>
      </div>
    );
  }
}

export default LogList;
