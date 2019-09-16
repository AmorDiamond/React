import React, { Component } from "react";
import { Radio, Table, Input, Button, Popconfirm, Form, Icon } from "antd";

import TableInput from "./ValidateTableCell";
import { rowValidate } from "./ValidateTableCellMethod";

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

interface IProps {
  columns: any[];
  changeCell: ({ columnInfo, value, index, errorInfo }) => void;
  dataSource: any[];
  rowKey?: string;
}

class EditTable extends Component<IProps, { tableColumns: any[] }> {
  public columns: any[];
  constructor(props) {
    super(props);
    this.state = { tableColumns: [] };
  }
  public defaultChangeCell = ({ columnInfo, value, record, index }) => {
    const { dataSource } = this.props;
    let rowKey: any = this.props.rowKey;

    let dataIndex = index;
    if (rowKey) {
      dataIndex = dataSource.findIndex(item => item[rowKey] == record[rowKey]);
    }
    let errorInfo = rowValidate({ columnInfo, value, index: dataIndex, tableData: dataSource });
    this.props.changeCell({ columnInfo, value,index: dataIndex,  errorInfo });
  };

  componentDidMount() {
    let { columns } = this.props;
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
  }

  render() {
    const { dataSource } = this.props;
    const { tableColumns } = this.state;
    const components = {
      body: {
        cell: EditableCell
      }
    };

    return <Table className='validate-table' rowKey={(item, index: any) => index} components={components} columns={tableColumns} dataSource={dataSource.slice()} bordered pagination={false} />;
  }
}

export default EditTable;
