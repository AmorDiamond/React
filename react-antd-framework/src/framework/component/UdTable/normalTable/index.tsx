import React, { Component } from "react";
import { Table } from "antd";
import _ from "lodash";
import { IBaseActionBtn } from "@ui/UdActionButton/ActionButtons";
import { getColumnRender } from "../defaultRender";
import { TableColumn, ITableData, ColumnTypes } from "../types";
import { PaginationConfig, SorterResult, TableRowSelection } from "antd/lib/table";

import "../table.less";

interface ITableProps<T> extends IBaseActionBtn<T> {
  id?: string;
  columns: TableColumn<T>[];
  pageData: ITableData<T>;
  changeSearch: ({ tableSearch }: { tableSearch: any }) => void;

  sortKey?: string;
  sortType?: "ascend" | "descend";
  rowSelection?: TableRowSelection<T>;
  needPagination?: boolean;
  onRow?: (record: T, index: number) => any;
  scroll?: {
    x?: boolean | number | string;
    y?: boolean | number | string;
  };
}

interface IStateProps<T> {
  columns?: TableColumn<T>[];
}

class NormalTable<T> extends Component<ITableProps<T>, IStateProps<any>> {
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
    let tableSearch: any = {
      page: pagination.current,
      size: pagination.pageSize
    };
    /**检索条件 */
    if (sorter.columnKey) {
      tableSearch.sorterKey = sorter.columnKey;
      tableSearch.sortType = sorter.order;
    }

    this.props.changeSearch({ tableSearch });
  };

  render() {
    const { pageData, id = "id", loading, scroll, rowSelection, needPagination = true, onRow } = this.props;
    const { current, pageSize, totalCount } = pageData;
    const { columns = [] } = this.state;

    let pagination = needPagination
      ? {
          current: current,
          showTotal: (total: number, range: [number, number]) => "共 " + total + " 条记录 第" + current + " / " + Math.ceil(totalCount / pageSize) + " 页",
          defaultCurrent: current,
          defaultPageSize: pageSize,
          pageSize: pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          total: totalCount
        }
      : false;
    return (
      <React.Fragment>
        {columns.length > 0 && (
          <Table
            className='public-table'
            onChange={this.changeSearch}
            pagination={pagination}
            loading={loading}
            rowKey={(row: any, index: number) => (id == "index" ? index : row[id])}
            dataSource={pageData.content.slice()}
            bordered
            columns={columns}
            scroll={scroll}
            onRow={(record, index) => {
              return {
                onDoubleClick: event => {
                  onRow && onRow(record, index);
                }
              };
            }}
            rowSelection={rowSelection}
            // scroll={{x: true}}
          />
        )}
      </React.Fragment>
    );
  }
}

export default NormalTable;
