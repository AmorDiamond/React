import React, { Component } from "react";
import { Table } from "antd";
import _ from "lodash";
import { getColumnRender } from "../defaultRender";
import { TableColumn, ITableData, ColumnTypes } from "../types";
import { PaginationConfig, SorterResult, TableRowSelection } from "antd/lib/table";

import "../table.less";
import { IBaseActionBtn } from "@/framework/ui/UdActionButton/ActionButtons";

interface ITableProps<T> extends IBaseActionBtn<T> {
  id?: string;
  columns: TableColumn<T>[];
  // loading: boolean;
  // defaultLoadingKey: string;
  // submitData?: () => void;
  // changeModal?: (any) => void;
  pageData: T[];
  changeSearch?: ({ tableSearch }: { tableSearch: any }) => void;
  // orderByInfo?:{key:any,value:any};
  sortKey?: string;
  sortType?: "ascend" | "descend";
  rowSelection?: TableRowSelection<T>;
  needPagination?: boolean;
  expandArr?: string[];
  changExpand?: (isAdd: boolean, key: string) => void;
  onRow?: (record: T, index: number) => any;
}

interface IStateProps<T> {
  columns?: TableColumn<T>[];
}

class NoPageTable<T> extends Component<ITableProps<T>, IStateProps<any>> {
  constructor(props: ITableProps<T>) {
    super(props);
    this.state = { columns: [] };
  }

  componentDidMount() {
    let columns: TableColumn<T>[] = _.cloneDeep(this.props.columns);
    columns = columns.filter(column => {
      return column.columnType != ColumnTypes.BtnList || column.normalBtn.length > 0;
    });
    const { submitData, changeModal, loading, defaultLoadingKey, sortKey, sortType } = this.props;
    columns.forEach(item => {
      if (item.columnType && item.columnType != ColumnTypes.Base) {
        item.render = getColumnRender(item, { submitData, changeModal, loading: false, defaultLoadingKey });
        if (item.columnType != ColumnTypes.TranslateNull) {
          item.onCell = (record, rowIndex) => {
            return {
              onClick: event => {
                event.stopPropagation();
              }
            };
          };
        }
      }
      if (sortKey && item.key == sortType) {
        item.sorter = true;
        item.defaultSortOrder = sortType;
      }
    });
    this.setState({ columns });
  }

  //改变查询
  changeSearch = (pagination: PaginationConfig, filters: Record<keyof T, string[]>, sorter: SorterResult<T>) => {
    let tableSearch: any = {};
    /**检索条件 */
    if (sorter.columnKey) {
      tableSearch.sorterKey = sorter.columnKey;
      tableSearch.sortType = sorter.order;
    }
    let { changeSearch } = this.props;
    changeSearch && changeSearch({ tableSearch });
  };

  render() {
    const { pageData = [], id = "id", changExpand, expandArr = [], loading, rowSelection, onRow } = this.props;
    const { columns = [] } = this.state;

    return (
      <React.Fragment>
        {columns.length > 0 && (
          <Table
            className='public-table'
            defaultExpandAllRows={true}
            onChange={this.changeSearch}
            pagination={false}
            loading={loading}
            rowKey={(row: any, index: number) => row[id]}
            dataSource={pageData.slice()}
            bordered
            columns={columns}
            onExpand={(expanded, record: any) => {
              changExpand && changExpand(expanded, record.id);
            }}
            onRow={(record, index) => {
              return {
                onDoubleClick: event => {
                  onRow && onRow(record, index);
                }
              };
            }}
            expandedRowKeys={expandArr.slice()}
            rowSelection={rowSelection}
          />
        )}
      </React.Fragment>
    );
  }
}

export default NoPageTable;
