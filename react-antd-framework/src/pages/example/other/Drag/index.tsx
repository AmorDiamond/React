import React, { Component } from "react";
import { RouteComponentProps } from "react-router";

import { Form } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import DragDndCard from "@/framework/component/DndComponent/Card";
import { arrExchangeIndex } from "@/utils";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./index.less";

interface IProps extends RouteComponentProps {
  form: WrappedFormUtils;
}

class Detail extends Component<IProps, { data: any[] }> {
  state = {
    data: [
      { id: 1, name: "姓名1" },
      { id: 2, name: "姓名2" },
      { id: 3, name: "姓名3" },
      { id: 4, name: "姓名4" }
    ]
  };
  public moveCard = (dragIndex: number, hoverIndex: number) => {
    let { data } = this.state;
    data = arrExchangeIndex(data, dragIndex, hoverIndex);
    this.setState({ data });
  };
  render() {
    let { data } = this.state;
    return (
      <div className='page drag-page'>
        <div className='page-title'>拖拽页面</div>
        <div className='content'>
          {data.map((item, index) => (
            <DragDndCard
              index={index}
              id={item.id}
              key={item.id}
              moveCard={this.moveCard}
              content={<div className='card'>{item.name}</div>}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Form.create()(DragDropContext(HTML5Backend)(Detail));
//export default Detail;
