import React, { Component, ReactNode } from "react";
import EditTable from "./EditTable";

import { validateCellAllRule, validateRow, validateTable, validateColumns } from "./validate/defaultValidateMethod";
import { IEditColumn } from "./type";
import { RouteComponentProps } from "react-router";

const getColumnsByKeys = (Keys: string | string[], columns: IEditColumn[]): IEditColumn[] => {
  let dataIndexs: string[] = typeof Keys == "string" ? [Keys] : Keys;
  let validateColumns: IEditColumn[] = columns.filter(column => dataIndexs.indexOf(column.dataIndex) > -1);
  return validateColumns;
};

// interface ITable {
//   columns: any[];
//   tableData: any[];
//   tableKey?: string;
// }
export interface IEditTableProps extends RouteComponentProps {
  changeTableData: ({ data, tableKey }) => void;
  romoveTableRow: (tableKey, row) => void;
  initTable: ({ data, tableKey, columns }) => void;
  validaTable: (tableKey: string) => { isPass,tableData };
  linkTable: (tableKey: string) => ReactNode;
  allTableData: any;
  // allTableColumns: {};
}

interface IState {
  allTableData: { [name: string]: any[] };
  allTableColumns: { [name: string]: any[] };
  isDisable: boolean;
}

/** isVNoOpCol 关联验证的情况下，相关联的单元格发生变化时，未操作的单元是否需要促发验证*/
export const createEditTable: (param?: any) => any = ({ isVNoOpCol = false } = {}) => WrappedComponent => {
  // ...并返回另一个组件...
  return class extends Component<{}, IState> {
    constructor(props) {
      super(props);
      this.state = { allTableData: {}, allTableColumns: {}, isDisable: false };
    }

    public changeCell = ({ columnInfo, value, index, tableKey, columns }) => {
      let { ...allTableData } = this.state.allTableData;
      let tableData = allTableData[tableKey];
      let { dataIndex, valdateCellRlues, relationRowKeys, relationColumnKeys } = columnInfo;
      tableData[index][dataIndex] = value;

      if (valdateCellRlues) {
        tableData[index]["errorInfo"][dataIndex] = "";
        let errorInfo = validateCellAllRule({ value, columnInfo, index, tableData });

        if (errorInfo != "") {
          tableData[index]["errorInfo"][dataIndex] = errorInfo;
        }
      }
      if (relationRowKeys) {
        let vColumns = getColumnsByKeys(relationRowKeys, columns);
        let currentErrorInfo = tableData[index].errorInfo;
        tableData[index].errorInfo = validateRow({ columns: vColumns, index, tableData, currentErrorInfo, VNoOpCol: isVNoOpCol });
      }
      if (relationColumnKeys) {
        let vColumns = getColumnsByKeys(relationColumnKeys, columns);

        tableData = validateColumns({ columns: vColumns, tableData, VNoOpCol: isVNoOpCol });
      }
      allTableData[tableKey] = tableData;
      this.setState({ allTableData });
    };

    public addRow = (tableKey, row): void => {
      let { ...allTableData } = this.state.allTableData;
      allTableData[tableKey].push(row);
      this.setState({ allTableData });
    };

    public romoveRow = (tableKey, index): void => {
      let { allTableData: tableData } = this.state;
      tableData[tableKey].splice(index, 1);
      this.setState({ allTableData: tableData });
    };

    public validaTable = tableKey => {
      
      let {  allTableColumns } = this.state;
      let { ...allTableData } = this.state.allTableData;
      
      let { isPass, tableData } = validateTable({ columns: allTableColumns[tableKey], tableData: allTableData[tableKey] });
      allTableData[tableKey] = tableData;
      this.setState({ allTableData });
      return { isPass, tableData };
    };

    public changeTableData = ({ data, tableKey }) => {
      let { ...allTableData } = this.state.allTableData;

      allTableData[tableKey] = data.map(item => {
        item.errorInfo = {};
        return item;
      });

      this.setState({ allTableData });
    };

    public initTable = ({ data, tableKey, columns }) => {
      let { allTableColumns } = this.state;
      let { ...allTableData } = this.state.allTableData;
      allTableData[tableKey] = data.map(item => {
        item.errorInfo = {};
        return item;
      });
      allTableColumns[tableKey] = columns;
      this.setState({ allTableData, allTableColumns });
    };

    public linkTable = tableKey => {
      console.info(this.state.allTableData);
      return <EditTable tableKey={tableKey} columns={this.state.allTableColumns[tableKey]} dataSource={this.state.allTableData[tableKey]} changeCell={this.changeCell} />;
    };

    render() {
      let { allTableData, allTableColumns } = this.state;

      return (
        <WrappedComponent
          allTableData={allTableData}
          // allTableColumns={allTableColumns}
          status={status}
          linkTable={this.linkTable}
          changeTableData={this.changeTableData}
          romoveTableRow={this.romoveRow}
          initTable={this.initTable}
          validaTable={this.validaTable}
        />
      );
    }
  };
};

export const withTestTable = WrappedComponent => {
  class HOC extends Component<any, any> {
    state = { allTableData: {}, allTableColumns: {}, isDisable: false };

    public changeTableData = ({ data, tableKey }) => {
      let { ...allTableData } = this.state.allTableData;

      allTableData[tableKey] = data.map(item => {
        item.errorInfo = {};
        return item;
      });

      this.setState({ allTableData });
    };

    public initTable = ({ data, tableKey, columns }) => {
      let { allTableData } = this.state;

      allTableData[tableKey] = data.map(item => {
        item.errorInfo = {};
        return item;
      });

      this.setState({ allTableData });
    };

    render() {
      return (
        <div>
          <WrappedComponent initTable={this.initTable} changeTableData={this.changeTableData} {...this.state} />
        </div>
      );
    }
  }
  return HOC;
};

// export default ValidateTable;
