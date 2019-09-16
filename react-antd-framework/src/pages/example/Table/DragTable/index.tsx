import React, { Component, createRef } from "react";
import { observer } from "mobx-react";

import { TableColumn, ColumnTypes } from "@/framework/component/UdTable/types";

import { NoHtmlBackendTable } from "@/framework/component/DndComponent/Table/NoHtmlBackendTable";
import { RouteComponentProps } from "react-router";

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

export interface IProcurement {
  purchaseNo: string;
}
let content: any[] = [];
for (var i = 0; i < 10; i++) {
  let item = {
    id: i,
    index: i,
    code: "00" + i,
    backendName: "后台名称" + i,
    name: "名称" + i,
    createBy: "zxz",
    category: 1,
    updateTimestamp: "2014-01-01"
  };
  content.push(item);
}

@observer
class ProcurementList extends Component<RouteComponentProps, { data: any[] }> {
  public column: TableColumn[] = [
    {
      title: "采购单号",
      className: "min-width-100",
      dataIndex: "index",
      key: "index"
    },
    {
      title: "供应商编码",
      className: "min-width-100",
      dataIndex: "backendName",
      key: "backendName"
    },
    {
      title: "供应商名称",
      className: "min-width-100",
      dataIndex: "name",
      key: "name"
    }
  ];
  state = { data: content };
  // 设置属性
  public changeSort = data => {
    this.setState({ data });
  };

  render() {
    let { data } = this.state;

    return (
      <div>
        <NoHtmlBackendTable
          changeSort={this.changeSort}
          columns={this.column}
          data={data}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(ProcurementList);
