import React, { Component, createRef } from "react";

import { ActionButtons } from "../../framework/ui/UdActionButton/ActionButtons";
import NormalTable from "@/framework/component/UdTable/normalTable";

import { getAcctions } from "@/framework/ui/UdActionButton/ActionButtons";

import { column, ILog, FormItems } from "./index.option";
import { Button } from "antd";
import { Link, RouteComponentProps } from "react-router-dom";


class LogList extends Component<RouteComponentProps, {}> {
  public form;
  constructor(props) {
    super(props);
    this.form = createRef();
    this.state = {
      loading: false
    };
  }
  public submitData = () => {
    debugger;
  };
  public changeSearch = () => {
    debugger;
  };
  public handleSubmit = () => {
    this.form.current.setFieldsValue({ title: 224 });
  };

  render() {
    const pageData = {
      current: 1,
      pageSize: 10,
      totalCount: 0,
      content: [
        {
          title: "测试",
          pro: 1,
          status: 0
        }
      ]
    };
    return (
      <div className='page'>
       {/* <ActionButtons btnlist={pageBtnlist} submitData={this.submitData} data={{}} loading={false} /> */}
      </div>
    );
  }
}

export default LogList;
