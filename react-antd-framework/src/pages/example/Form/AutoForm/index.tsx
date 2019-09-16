import React, { Component, createRef } from "react";
import { RouteComponentProps } from "react-router";

import { FilterFields } from "./index.options";

import { Select, DatePicker } from "antd";
import ASelect from "./selfSelect";
import UdForm from "@ui/UdForm/UdNormalForm";
const { Option } = Select;

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
    this.form.current.setFieldsValue({ title: 224 });
  };
  public changeSearch = () => {
    debugger;
  };
  public handleSubmit = () => {
    this.form.current.setFieldsValue({ title: 224 });
  };

  render() {
    let data = {};
    return (
      <div className='page'>
        <div className='page-title'>普通表单</div>
        <div className='page-panel'>
          <UdForm values={data} fields={FilterFields} />
        </div>
      </div>
    );
  }
}

export default LogList;
