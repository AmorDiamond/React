import React, { Component, createRef } from "react";
import { RouteComponentProps } from "react-router";

import SmartFilter from "@/framework/ui/UdForm/UdFilterForm/SmartFilter";
import NormalFilter from "@/framework/ui/UdForm/UdFilterForm/NormalFilter";

import { FilterFields } from "./index.options";

class LogList extends Component<RouteComponentProps, { data: any; isExpand: boolean }> {
  public form;
  constructor(props) {
    super(props);
    this.form = createRef();
    this.state = {
      data: {},
      isExpand: false
    };
  }
  public submitData = data => {
    this.setState({ data });
  };
  public changeExpand = isExpand => {
    this.setState({ isExpand });
  };
  public handleSubmit = () => {
    this.form.current.setFieldsValue({ title: 224 });
  };

  render() {
    let { data, isExpand } = this.state;
    return (
      <div className='page'>
        <div className='page-title'>检索表单</div>
        <div className='page-panel'>
          <div className='panel-title'>简单检索</div>
          <SmartFilter btnLeftSpace={85} submit={this.submitData} fields={FilterFields} values={{}} />
        </div>
        <div className='page-panel'>
          <div className='panel-title'>普通检索</div>
          <NormalFilter submit={this.submitData} count={3} rightSpace={30} isExpand={isExpand} changeExpand={this.changeExpand} fields={FilterFields} />
        </div>
        <div className='page-panel'>
          <div className='panel-title'>输入内容</div>
          {JSON.stringify(data)}
        </div>
      </div>
    );
  }
}

export default LogList;
