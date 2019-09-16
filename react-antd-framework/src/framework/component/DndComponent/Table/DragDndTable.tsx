import { Table } from "antd";
import { DragDropContext, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import React, { Component } from "react";
import "./index.less";
import { TableColumn } from "@/framework/component/UdTable/types";

import { arrExchangeIndex } from "@/utils";
import { intercept } from "mobx";
import { ColumnProps } from "antd/lib/table";

let dragingIndex = -1;

class BodyRow extends Component<any, any> {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;

    const style = { ...restProps.style, cursor: "move" };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += " drop-over-downward";
      }
      if (restProps.index < dragingIndex) {
        className += " drop-over-upward";
      }
    }

    return connectDragSource(connectDropTarget(<tr {...restProps} className={className} style={style} />));
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource("row", rowSource, connect => ({
    connectDragSource: connect.dragSource()
  }))(BodyRow)
);

interface IProps<T> {
  data: T[];
  columns: ColumnProps<T>[];
  changeSort: (datas: T[]) => void;
}
interface IState {}

export class DragSortingTable<T> extends Component<IProps<T>, IState> {
  components = {
    body: {
      row: DragableBodyRow
    }
  };

  moveRow = (dragIndex, hoverIndex) => {
    let { data } = this.props;
    data = arrExchangeIndex(data, dragIndex, hoverIndex);
    this.props.changeSort(data);
  };

  render() {
    let { data, columns } = this.props;
    return (
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow
        })}
      />
    );
  }
}

export const DragDndTable = DragDropContext(HTML5Backend)(DragSortingTable);
