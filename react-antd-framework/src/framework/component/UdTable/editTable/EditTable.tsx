import React, { Component } from "react";
import { Table } from "antd";

import TableInput from "./ValidateTableCell";

import { IEditColumn } from "./type";
import "./index.less";

class EditableCell extends Component<any, any> {
  public input: any;
  render() {
    const { dataIndex, Control, record, rowIndex, onChange, ...restProps } = this.props;

    let errorInfo: any = record.errorInfo || {};
    return (
      <td {...restProps}>
        {!Control ? (
          restProps.children
        ) : (
          <TableInput errorInfo={errorInfo[dataIndex]}>
            <Control
              value={record[dataIndex]}
              onChange={value => {
                onChange(value);
              }}
            />
          </TableInput>
        )}
      </td>
    );
  }
}

interface IProps<T> {
  columns: IEditColumn<T>[];
  changeCell: ({ columnInfo, value, index, tableKey, columns }) => void;
  //changeCell: any;
  dataSource: T[];
  tableKey: "string";
  rowKey?: string;
}

class EditTable<T = any> extends Component<IProps<T>, { tableColumns: any[] }> {
  public columns: any[];
  constructor(props) {
    super(props);
    this.state = { tableColumns: [] };
  }
  componentWillReceiveProps(nextProps: IProps<T>) {
    if (nextProps.columns.length != this.props.columns.length) {
      this.initTable(nextProps.columns);
    }
  }
  public defaultChangeCell = ({ columnInfo, value, record, index }) => {
    const { dataSource, tableKey } = this.props;
    let { tableColumns = [] } = this.state;
    let rowKey: any = this.props.rowKey;
    let dataIndex = index;
    if (rowKey) {
      dataIndex = dataSource.findIndex(item => item[rowKey] == record[rowKey]);
    }
    this.props.changeCell({ columnInfo, value, index: dataIndex, tableKey, columns: tableColumns });
  };

  componentDidMount() {
    let { columns = [] } = this.props;
    if (columns.length > 0) {
      this.initTable(columns);
    }
  }
  initTable = columns => {
    // let { columns = [] } = this.props;
    let tableColumns = columns.map(col => {
      return {
        ...col,
        onCell: (record, rowIndex) => ({
          record,
          Control: col.contorl,
          rowIndex: rowIndex,
          dataIndex: col.dataIndex,
          onChange: value => this.defaultChangeCell({ index: rowIndex, record, columnInfo: col, value })
        })
      };
    });

    this.setState({ tableColumns });
  };

  render() {
    const { dataSource } = this.props;
    const { tableColumns = [] } = this.state;
    const components = {
      body: {
        cell: EditableCell
      }
    };

    return <Table className='validate-table' rowKey={(item, index: any) => index} components={components} columns={tableColumns} dataSource={dataSource} bordered pagination={false} />;
  }
}

export default EditTable;
