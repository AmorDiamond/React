import React, { Component, createRef } from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";

import { columns, data } from "./index.options";
import NormalTable from "@/framework/component/UdTable/normalTable";
import { IEditTableProps, createEditTable, withTestTable } from "@/framework/component/UdTable/editTable/hotTable";
import { Button } from "antd";

@observer
class EditTable extends Component<IEditTableProps, { allTableData: any }> {
  public form;
  constructor(props) {
    super(props);
    this.form = createRef();
    this.state = {
      allTableData: {}
    };
    this.props.initTable({ data, tableKey: "edit", columns });
  }
  public getNewData() {
    let res = this.props.validaTable("edit");
    this.setState({ allTableData: res.tableData });
  }
  componentDidMount() {
    this.props.initTable({ data, tableKey: "edit", columns });
  }

  render() {
    const { linkTable } = this.props;
    const { allTableData } = this.state;
    const Table = linkTable("edit");
    return (
      <div className='page'>
        <div className='page-title'>可编辑Table</div>
        <Button
          onClick={() => {
            this.getNewData();
          }}
        >
          验证所有并获取结果
        </Button>
        <div className='page-panel'>{Table}</div>
        <div>{JSON.stringify(allTableData)}</div>
      </div>
    );
  }
}

export default createEditTable()(EditTable);

// class Demo extends Component<any, any> {
//   render() {
//     return (
//       <div>
//         <Button onClick={this.props.changeState}>改变</Button>
//         {this.props.name}
//       </div>
//     );
//   }
// }

// const withHeader = WrappedComponent => {
//   class HOC extends Component<any, { name: string }> {
//     state = { name: "1" };
//     changeState = () => {
//       this.setState({ name: "123123123" });
//     };
//     render() {
//       return (
//         <div>
//           <h1 className='demo-header'>我是标题</h1>
//           <Button onClick={this.changeState}>改变</Button>
//           <WrappedComponent changeState={this.changeState} {...this.state} />
//         </div>
//       );
//     }
//   }
//   return HOC;
// };

// export default withHeader(Demo);
